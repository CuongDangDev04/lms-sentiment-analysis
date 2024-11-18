const  DataTypes  = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Course = require("./course");

const StudentCourse = sequelize.define("Student_Course", {
  
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Khóa ngoại trỏ tới User
      key: "id",
    },
    onDelete: "CASCADE", // Khi User bị xóa, bản ghi tương ứng trong bảng trung gian cũng bị xóa
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course, // Khóa ngoại trỏ tới Course
      key: "id",
    },
    onDelete: "CASCADE", // Khi Course bị xóa, bản ghi tương ứng trong bảng trung gian cũng bị xóa
  },
});
module.exports = StudentCourse;
