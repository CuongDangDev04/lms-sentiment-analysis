const CommentQueue = require("../models/commentQueue");
const addCommentToQueue = async (studentId, courseId, commentText) => {
  try {
    await CommentQueue.create({ studentId, courseId, commentText });
  } catch (error) {
    console.error("Lỗi khi thêm comment vào hàng đợi:", error);
  }
};

module.exports = {
  addCommentToQueue,
};
