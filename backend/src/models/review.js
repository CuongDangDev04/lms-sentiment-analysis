const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Course = require("./course");
const SentimentAnalysis = require("./SentimentAnalysis");

const Review = sequelize.define(
  "Review",
  {
    courseId: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Đặt khóa chính cho cột courseId
      allowNull: false,
      references: {
        model: Course, // Tham chiếu đến bảng Course
        key: "id", // Khóa chính của bảng Course
      },
      onDelete: "CASCADE", // Xóa Review nếu Course bị xóa
    },
    studentId: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Đặt khóa chính cho cột studentId
      allowNull: false,
      references: {
        model: User, // Tham chiếu đến bảng User
        key: "id", // Khóa chính của bảng User
      },
      onDelete: "CASCADE", // Xóa Review nếu User (Sinh viên) bị xóa
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAnalyzed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Mặc định là false, tức là chưa phân tích
      allowNull: false,
    },
    sentimentAnalysisId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: SentimentAnalysis, // Tham chiếu đến bảng SentimentAnalysis
        key: "id", // Khóa chính của bảng SentimentAnalysis
      },
      onDelete: "SET NULL", // Nếu SentimentAnalysis bị xóa, trường này sẽ là NULL
    },
  },
  {
    timestamps: true, // Thêm trường createdAt và updatedAt tự động
  }
);

// Thiết lập mối quan hệ với User và Course

module.exports = Review;
