const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Category = require("./category");

const Course = sequelize.define(
  "Course", // Tên model phải là "Course" (viết hoa)
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
      references: {
        model: User, // Liên kết với bảng User thay vì Instructor
        key: "id",
      },
      onDelete: "CASCADE", // Xóa Course nếu User bị xóa
      validate: {
        isInstructor(value) {
          // Kiểm tra role của User là 'instructor'
          if (value) {
            User.findOne({ where: { id: value, role: "instructor" } })
              .then((user) => {
                if (!user) {
                  throw new Error("User must have role 'instructor'");
                }
              })
              .catch((err) => {
                throw err;
              });
          }
        },
      },
    },
    number_of_lessons: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    number_of_students: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT, // Dùng FLOAT cho điểm đánh giá
      allowNull: true,
    },
    duration: {
      //tính theo giờ
      type: DataTypes.INTEGER, // Thời gian khóa học tính theo giờ
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING, // Đường dẫn đến hình ảnh
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER, // Sử dụng kiểu INTEGER cho categoryId
      allowNull: false,
      references: {
        model: Category, // Model mà khóa ngoại trỏ đến
        key: "id", // Trường khóa chính trong bảng Category
      },
      onDelete: "CASCADE", // Khi category bị xóa, các khóa học liên quan cũng sẽ bị xóa
    },
  },
  {
    timestamps: true, // Sequelize tự động thêm createdAt và updatedAt
  }
);

module.exports = Course;
