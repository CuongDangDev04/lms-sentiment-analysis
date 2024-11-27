// const { analyzeUserReviews } = require("../controllers/sentimentController");
const { SentimentAnalysis, sequelize } = require("../models");
const CommentQueue = require("../models/commentQueue");
// const SentimentAnalysis = require("../models/SentimentAnalysis");
const Review = require("../models/review");
const path = require("path");
const { spawn } = require("child_process");

// Chỉnh sửa analyzeUserReviews để gọi nội bộ
async function analyzeUserReviews({ userId, courseId, reviewTexts }) {
  try {
    // Thực hiện phân tích (gọi Python script như cũ)
    const scriptPath = path.join(
      __dirname,
      "..",
      "..",
      "src",
      "scriptspy",
      "sentiment_analysis.py"
    );
    const pythonProcess = spawn("python", [
      scriptPath,
      JSON.stringify(reviewTexts),
    ]);

    let scriptOutput = "";
    let scriptError = "";

    pythonProcess.stdout.on("data", (data) => {
      scriptOutput += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      scriptError += data.toString();
    });
    return new Promise((resolve, reject) => {
      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`Python script exited with code ${code}`));
        }
        try {
          const analysisResults = JSON.parse(scriptOutput);
          resolve(analysisResults);
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  } catch (error) {
    throw new Error(`Error in analyzeUserReviews: ${error.message}`);
  }
}

async function processCommentQueue() {
  try {
    const reviews = await CommentQueue.findAll({ limit: 10 });

    if (!reviews.length) {
      return;
    }

    // Xử lý tất cả các reviews song song
    await Promise.all(
      reviews.map(async (review) => {
        try {
          const analysisResults = await analyzeUserReviews({
            userId: review.studentId,
            courseId: review.courseId,
            reviewTexts: [review.commentText],
          });

          const sentimentRecord = {
            userId: review.studentId,
            courseId: review.courseId,
            sentimentScorePositive: analysisResults[0].positive,
            sentimentScoreNegative: analysisResults[0].negative,
            sentimentScoreNeutral: analysisResults[0].neutral,
            sentimentLabel: analysisResults[0].label,
            reviewText: review.commentText,
          };

          const existingRecord = await SentimentAnalysis.findOne({
            where: { userId: review.studentId, courseId: review.courseId },
          });

          let sentiment;
          if (existingRecord) {
            await existingRecord.update(sentimentRecord);
            sentiment = existingRecord;
          } else {
            sentiment = await SentimentAnalysis.create(sentimentRecord);
          }

          const reviewRecord = await Review.findOne({
            where: { courseId: review.courseId, studentId: review.studentId },
          });

          if (reviewRecord && sentiment) {
            await reviewRecord.update({
              isAnalyzed: true,
              sentimentAnalysisId: sentiment.id,
            });
          }

          // Xóa bản ghi trong CommentQueue
          await review.destroy();
        } catch (error) {
          console.error(`Error processing review ID: ${review.id}`, error);
        }
      })
    );

    console.log("All reviews processed successfully.");
  } catch (error) {
    console.error("Error in processCommentQueue:", error);
  }
}

setInterval(processCommentQueue, 15000);
