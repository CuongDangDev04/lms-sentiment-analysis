const { analyzeUserReviews } = require("../controllers/sentimentController");
const { SentimentAnalysis } = require("../models");
const CommentQueue = require("../models/commentQueue");

async function processCommentQueue() {
  try {
    // Lấy các review chưa xử lý
    const reviews = await CommentQueue.findAll({ limit: 10 });

    if (!reviews.length) {
      console.log("No reviews to process.");
      return;
    }

    // Phân tích từng review theo courseId và userId
    for (const review of reviews) {
      const { id, studentId, courseId, comment } = review;

      try {
        // Gọi phương thức phân tích cảm xúc
        const result = await analyzeUserReviews({
          params: { userId: studentId, courseId },
        });

        // Lưu kết quả phân tích vào bảng SentimentAnalysis
        const sentimentRecord = {
          userId: studentId,
          courseId: courseId,
          sentimentScorePositive: result.sentimentScorePositive,
          sentimentScoreNegative: result.sentimentScoreNegative,
          sentimentScoreNeutral: result.sentimentScoreNeutral,
          sentimentLabel: result.sentimentLabel,
          reviewText: comment,
        };

        await SentimentAnalysis.create(sentimentRecord);
        const reviewRecord = await Review.findOne({ where: { id: review.id } });

        if (reviewRecord) {
          await reviewRecord.update({ isAnalyzed: true });
          console.log(`Successfully processed review ID: ${id}`);
        } else {
          console.log(`Review with ID: ${id} not found in the Review table.`);
        }
        // Đánh dấu review là đã phân tích hoặc xóa nó khỏi bảng Review
        await review.destroy(); // Xóa bản ghi đã xử lý
        console.log(`Successfully processed review ID: ${id}`);
      } catch (error) {
        console.error(
          `Error analyzing review for user ${studentId} and course ${courseId}:`,
          error
        );
      }
    }

    console.log("All reviews processed successfully.");
  } catch (error) {
    console.error("Error in processCommentQueue:", error);
  }
}

setInterval(processCommentQueue, 60000);
