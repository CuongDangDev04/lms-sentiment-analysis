const sequelize = require("../config/db");
const User = require("./user");
const Category = require("./category");
const Course = require("./course");
const Review = require("./review");
// Thiết lập quan hệ
User.hasMany(Course, {
  foreignKey: "instructorId",
  as: "courses", // Alias "courses" cho quan hệ từ User đến Course
  scope: {
    role: "instructor", // Điều kiện role phải là 'instructor'
  },
});

Course.belongsTo(User, {
  foreignKey: "instructorId",
  as: "instructor", // Alias "instructor" cho quan hệ từ Course đến User
});

// Cập nhật alias cho mối quan hệ Course - Category
Course.belongsTo(Category, {
  foreignKey: "categoryId", // Trường khóa ngoại trong Course
  as: "category", // Alias "category" cho quan hệ từ Course đến Category
});

User.hasMany(Review, {
  foreignKey: "studentId",
  as: "reviews",
});

Review.belongsTo(User, {
  foreignKey: "studentId",
  as: "student",
});

Course.hasMany(Review, {
  foreignKey: "courseId",
  as: "reviews",
});

Review.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

module.exports = {
  sequelize,
  User,
  Course,
  Category,
  Review,
};
