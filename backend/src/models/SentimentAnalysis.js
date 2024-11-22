const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user"); // Đảm bảo rằng bạn đã định nghĩa model User
const Course = require("./course"); // Đảm bảo rằng bạn đã định nghĩa model Course

const SentimentAnalysis = sequelize.define("SentimentAnalysis", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,  // Tự động tăng id
  },
  userId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE", // Xóa sentiment nếu User bị xóa
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: "id",
    },
    onDelete: "CASCADE", // Xóa sentiment nếu Course bị xóa
  },
  sentimentScorePositive: {
    type: DataTypes.FLOAT,
    allowNull: true,  // Điểm tích cực
  },
  sentimentScoreNegative: {
    type: DataTypes.FLOAT,
    allowNull: true,  // Điểm tiêu cực
  },
  sentimentScoreNeutral: {
    type: DataTypes.FLOAT,
    allowNull: true,  // Điểm trung tính
  },
  sentimentLabel: {
    type: DataTypes.STRING,
    allowNull: true,  // Nhãn phân tích cảm xúc (positive, negative, neutral)
  },
  reviewText: {
    type: DataTypes.TEXT,
    allowNull: true,  // Nội dung bình luận của người dùng
  }
},
{
  timestamps: true,  // Thêm các trường createdAt và updatedAt tự động
});

module.exports = SentimentAnalysis;
