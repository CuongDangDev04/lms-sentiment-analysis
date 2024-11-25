const { Queue, Worker } = require("bullmq");
const redisOptions = {
  port: 30868, // Cổng Redis của bạn
  host: "gusc1-cute-louse-30868.upstash.io", // Địa chỉ Redis
  password: "84be501a1396498a89050f325305097a", // Mật khẩu Redis
  tls: true,
};

// Tạo queue phân tích bình luận
const commentAnalysisQueue = new Queue("commentAnalysis", {
  connection: redisOptions,
});

// Worker xử lý phân tích bình luận
const worker = new Worker(
  "commentAnalysis",
  async (job) => {
    const { courseId, userId, comment } = job.data;

    // Thực hiện phân tích bình luận (ví dụ: phân tích cảm xúc)
    const analysisResult = await analyzeComment(courseId, userId, comment); // Function phân tích bình luận của bạn

    // Lưu kết quả phân tích vào cơ sở dữ liệu hoặc thực hiện các hành động khác
    await saveAnalysisResult(analysisResult, userId, courseId);

    // Trả kết quả phân tích
    return analysisResult;
  },
  { connection: redisOptions }
);
worker.on("completed", (job, result) => {
  console.log(`Job completed: ${job.id}, analysis result: ${result}`);
  // Bạn có thể gửi email thông báo hoặc lưu kết quả phân tích vào cơ sở dữ liệu
});

async function analyzeComment(courseId, userId, comment) {
  try {
    // Gọi API để phân tích cảm xúc của bình luận
    const response = await fetch(
      `/api/sentiment/analyze/${courseId}/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: comment, // Gửi bình luận để phân tích
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error analyzing comment:", errorData.message);
      return;
    }

    const result = await response.json();
    console.log("Sentiment analysis result:", result);
    alert("Sentiment analysis completed successfully!");
  } catch (error) {
    console.error("Error in analyzeComment function:", error);
  }
}
async function saveAnalysisResult(result, studentId, courseId) {
  // Lưu kết quả phân tích vào cơ sở dữ liệu
  console.log(
    `Saving analysis for student ${studentId} on course ${courseId}: ${result}`
  );
}

module.exports = { commentAnalysisQueue };
