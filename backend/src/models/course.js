const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Course = sequelize.define(
  "course",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, // Tự động tăng
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT, // Dùng TEXT để lưu mô tả dài
      allowNull: true,
    },
    instructorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instructorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number_of_lessons: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number_of_students: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    certificate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT, // Dùng FLOAT cho điểm đánh giá
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER, // Thời gian khóa học, có thể tính bằng giờ hoặc ngày
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING, // Đường dẫn đến hình ảnh
      allowNull: true,
    },
    studentsCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Sequelize tự động thêm createdAt và updatedAt
  }
);

module.exports = Course;
