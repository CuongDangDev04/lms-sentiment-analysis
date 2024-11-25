const SentimentAnalysis = require("../models/SentimentAnalysis");
const Review = require("../models/review");
const User = require("../models/user")
const path = require('path');
const { spawn } = require('child_process');
const Course = require('../models/course')
//phân tích cả khóa học
exports.analyzeCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Lấy các review từ cơ sở dữ liệu
    const reviews = await Review.findAll({
      where: { courseId },
      include: [
        {
          model: User,
          as: 'reviewStudent',
        },
      ],
    });

    // Nếu không có review, trả về lỗi
    if (!reviews.length) {
      console.log('No comment found for courseId:', courseId);
      return res.status(404).send({ message: 'No reviews found for this course.' });
    }

    // Tạo mảng các bình luận từ reviews
    const reviewTexts = reviews.map((review) => review.comment);

    //  đường dẫn tới script Python
    const scriptPath = path.join(__dirname, '..', '..', 'src', 'scriptspy', 'sentiment_analysis.py');

    // Cấu hình tham số đầu vào cho script Python
    const pythonProcess = spawn('python', [scriptPath, JSON.stringify(reviewTexts)]);

    let scriptOutput = '';
    let scriptError = '';

    // Lắng nghe dữ liệu trả về từ Python
    pythonProcess.stdout.on('data', (data) => {
      scriptOutput += data.toString();
    });

    // Xử lý lỗi khi chạy Python
    pythonProcess.stderr.on('data', (data) => {
      scriptError += data.toString();
    });

    // Khi Python script hoàn thành
    pythonProcess.on('close', async (code) => {
      if (code !== 0) {
        console.error(`Python script exited with code ${code}`);
        console.error('Python script stderr:', scriptError);
        return res.status(500).send({ error: 'Error in Python script execution' });
      }

      // Kiểm tra kết quả trả về từ Python
      if (!scriptOutput || scriptOutput.length === 0) {
        console.error('No output from Python script');
        return res.status(500).send({ error: 'No output from Python script' });
      }

      try {
        // Parse kết quả trả về từ Python (dự kiến là JSON)
        const analysisResults = JSON.parse(scriptOutput);

        // Tạo các bản ghi sentiment để lưu vào cơ sở dữ liệu
        const sentimentRecords = reviews.map((review, i) => ({
          
          userId: review.studentId,
          courseId: courseId,
          sentimentScorePositive: analysisResults[i].positive,
          sentimentScoreNegative: analysisResults[i].negative,
          sentimentScoreNeutral: analysisResults[i].neutral,
          sentimentLabel: analysisResults[i].label,
          reviewText: review.comment,
        }));


        try {
          // Lưu các kết quả phân tích vào cơ sở dữ liệu
          await SentimentAnalysis.bulkCreate(sentimentRecords);
          console.log('Sentiment records saved successfully.');

          return res.status(200).send({
            message: 'Sentiment analysis completed and saved successfully.',
            sentimentRecords,
          });
        } catch (saveError) {
          console.error('Error saving sentiment records:', saveError);
          return res.status(500).send({ error: 'Error saving sentiment records' });
        }
      } catch (parseError) {
        console.error('Error parsing Python script output:', parseError);
        return res.status(500).send({ error: 'Error parsing Python script output' });
      }
    });

  } catch (err) {
    console.error('Error in analyzeCourseReviews:', err);
    return res.status(500).send({ error: 'An error occurred while processing the reviews.' });
  }
};

// phân tích thep courseId và UserId
exports.analyzeUserCourseReviews = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    // Kiểm tra xem đã có phân tích cảm xúc cho userId và courseId này chưa
    const existingAnalysis = await SentimentAnalysis.findOne({
      where: { userId, courseId }
    });

    if (existingAnalysis) {
      return res.status(400).send({ message: 'Sentiment analysis already exists for this user and course.' });
    }

    // Lấy các review từ cơ sở dữ liệu theo userId và courseId
    const reviews = await Review.findAll({
      where: { courseId, studentId: userId },
      include: [
        {
          model: User,
          as: 'reviewStudent',
        },
      ],
    });

    // Nếu không có review, trả về lỗi
    if (!reviews.length) {
      console.log(`No reviews found for courseId: ${courseId}, userId: ${userId}`);
      return res.status(404).send({ message: 'No reviews found for this user and course.' });
    }

    // Tạo mảng các bình luận từ reviews
    const reviewTexts = reviews.map((review) => review.comment);

    // Đường dẫn tới script Python
    const scriptPath = path.join(__dirname, '..', '..', 'src', 'scriptspy', 'sentiment_analysis.py');

    // Cấu hình tham số đầu vào cho script Python
    const pythonProcess = spawn('python', [scriptPath, JSON.stringify(reviewTexts)]);

    let scriptOutput = '';
    let scriptError = '';

    // Lắng nghe dữ liệu trả về từ Python
    pythonProcess.stdout.on('data', (data) => {
      scriptOutput += data.toString();
    });

    // Xử lý lỗi khi chạy Python
    pythonProcess.stderr.on('data', (data) => {
      scriptError += data.toString();
    });

    // Khi Python script hoàn thành
    pythonProcess.on('close', async (code) => {
      if (code !== 0) {
        console.error(`Python script exited with code ${code}`);
        console.error('Python script stderr:', scriptError);
        return res.status(500).send({ error: 'Error in Python script execution' });
      }

      // Kiểm tra kết quả trả về từ Python
      if (!scriptOutput || scriptOutput.length === 0) {
        console.error('No output from Python script');
        return res.status(500).send({ error: 'No output from Python script' });
      }

      try {
        // Parse kết quả trả về từ Python (dự kiến là JSON)
        const analysisResults = JSON.parse(scriptOutput);

        // Tạo các bản ghi sentiment để lưu vào cơ sở dữ liệu
        const sentimentRecords = reviews.map((review, i) => ({
          userId: review.studentId,
          courseId: courseId,
          sentimentScorePositive: analysisResults[i].positive,
          sentimentScoreNegative: analysisResults[i].negative,
          sentimentScoreNeutral: analysisResults[i].neutral,
          sentimentLabel: analysisResults[i].label,
          reviewText: review.comment,
        }));

        // Lưu các kết quả phân tích vào cơ sở dữ liệu
        const savedSentimentRecords = await SentimentAnalysis.bulkCreate(sentimentRecords);
        console.log('Sentiment records saved successfully.');

        // Cập nhật bảng Review với `isAnalyzed = true` và `sentimentAnalysisId`
        await Promise.all(
          savedSentimentRecords.map(async (sentimentRecord, index) => {
            const review = reviews[index];
            await review.update({
              isAnalyzed: true,
              sentimentAnalysisId: sentimentRecord.id, // Cập nhật ID phân tích vào review
            });
          })
        );

        return res.status(200).send({
          message: 'Sentiment analysis completed and saved successfully.',
          sentimentRecords: savedSentimentRecords,
        });
      } catch (saveError) {
        console.error('Error saving sentiment records:', saveError);
        return res.status(500).send({ error: 'Error saving sentiment records' });
      }
    });

  } catch (err) {
    console.error('Error in analyzeUserCourseReviews:', err);
    return res.status(500).send({ error: 'An error occurred while processing the reviews.' });
  }
};


// lấy kq phân tích theo courseId và userId
exports.getSentimentAnalysisByCourseAndUser = async (req, res) => {
  try {
    const { courseId, userId } = req.params;

    // Truy vấn SentimentAnalysis theo courseId và userId
    const sentimentData = await SentimentAnalysis.findAll({
      where: { courseId, userId },
      include: [
        {
          model: User,  
          as: 'user',
          attributes: ['id', 'fullname'], 
        },
        {
          model: Course,  // Kết nối với model Course để lấy thông tin khóa học
          as: 'course',
          attributes: ['id', 'name'],  // Chỉ lấy các trường cần thiết
        }
      ]
    });

    // Kiểm tra nếu không có dữ liệu
    if (!sentimentData.length) {
      return res.status(404).send({ message: 'No sentiment analysis found for this user and course.' });
    }

    // Trả về dữ liệu sentiment analysis
    return res.status(200).json(sentimentData);
  } catch (err) {
    console.error('Error in getSentimentAnalysisByCourseAndUser:', err);
    return res.status(500).send({ error: 'An error occurred while retrieving sentiment analysis data.' });
  }
};


// lấy kq phân tích theo courseId
exports.getSentimentAnalysisByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Truy vấn SentimentAnalysis theo courseId
    const sentimentData = await SentimentAnalysis.findAll({
      where: { courseId },
      include: [
        {
          model: User,  // Kết nối với model User để lấy thông tin người dùng
          as: 'user', 
          attributes: ['id', 'username'],  // Chỉ lấy các trường cần thiết
        },
        {
          model: Course,  // Kết nối với model Course để lấy thông tin khóa học
          as: 'course',
          attributes: ['id', 'name'],  // Chỉ lấy các trường cần thiết
        }
      ]
    });

    // Kiểm tra nếu không có dữ liệu
    if (!sentimentData.length) {
      return res.status(404).send({ message: 'No sentiment analysis found for this course.' });
    }

    // Trả về dữ liệu sentiment analysis
    return res.status(200).json(sentimentData);
  } catch (err) {
    console.error('Error in getSentimentAnalysisByCourse:', err);
    return res.status(500).send({ error: 'An error occurred while retrieving sentiment analysis data.' });
  }
};