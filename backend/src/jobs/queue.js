const { Queue, Worker } = require("bullmq");
const fetch = require("node-fetch");

const redisOptions = {
  port: 30868,
  host: "gusc1-cute-louse-30868.upstash.io",
  password: "84be501a1396498a89050f325305097a",
  tls: true,
};

const commentAnalysisQueue = new Queue("commentAnalysis", {
  connection: redisOptions,
});

const worker = new Worker(
  "commentAnalysis",
  async (job) => {
    const { courseId, userId, comment } = job.data;

    // Thực hiện phân tích bình luận (ví dụ: phân tích cảm xúc)
    const analysisResult = await analyzeComment(courseId, userId, comment); // Function phân tích bình luận của bạn

    if (!analysisResult) {
      console.log("No analysis result returned");
      return null; // Trả về null nếu không có kết quả phân tích
    }

    // Lưu kết quả phân tích vào cơ sở dữ liệu hoặc thực hiện các hành động khác
    await saveAnalysisResult(analysisResult, userId, courseId);

    // Trả kết quả phân tích
    return analysisResult;
  },
  { connection: redisOptions }
);


worker.on("completed", (job, result) => {
  console.log(`Job completed: ${job.id}, analysis result: ${result}`);
});

worker.on("failed", (job, error) => {
  console.error(`Job failed after retries: ${job.id}, error: ${error.message}`);
});

async function analyzeComment(courseId, userId, comment) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/sentiment/analyze/${courseId}/${userId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: comment }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error analyzing comment:", errorData.message);
      return;
    }

    const result = await response.json();
    console.log("Sentiment analysis result:", result);
    return result;
  } catch (error) {
    console.error("Error in analyzeComment function:", error);
  }
}

async function saveAnalysisResult(result, studentId, courseId) {
  console.log(`Saving analysis for student ${studentId} on course ${courseId}: ${result}`);
}

module.exports = { commentAnalysisQueue };
