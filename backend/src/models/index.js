const sequelize = require("../config/db");
const User = require("./user");
const Course = require("./course");
const Category = require("./category");
const StudentCourse = require("./studentcourse");
const Review = require('./review');
const ApprovalRequest = require('./ApprovalRequest ');  // Import mô hình ApprovalRequest

// User - Course (Instructor)
User.hasMany(Course, {
  foreignKey: "instructorId",
  as: "courses", // Alias "courses" cho mối quan hệ
});
Course.belongsTo(User, {
  foreignKey: "instructorId",
  as: "instructor", // Alias "instructor" cho mối quan hệ
});

// Course - Category
Course.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category", // Alias "category" cho mối quan hệ
});
// Course - User (Students)
Course.belongsToMany(User, {
  through: StudentCourse, // Bảng trung gian
  as: "students", // Alias "students" cho mối quan hệ
  foreignKey: "courseId", // Khóa ngoại trong bảng trung gian
});
User.belongsToMany(Course, {
  through: StudentCourse, // Bảng trung gian
  as: "enrolledCourses", // Alias "enrolledCourses" cho mối quan hệ
  foreignKey: "userId", // Khóa ngoại trong bảng trung gian
});

// Thêm mối quan hệ ApprovalRequest - User (Instructor và Admin)
User.hasMany(ApprovalRequest, {
  foreignKey: "instructorId",
  as: "approvalRequests", // Alias "approvalRequests" cho mối quan hệ
});
ApprovalRequest.belongsTo(User, {
  foreignKey: "instructorId",
  as: "instructor", // Alias "instructor" cho mối quan hệ
});

User.hasMany(ApprovalRequest, {
  foreignKey: "adminId",
  as: "adminApprovalRequests", // Alias "adminApprovalRequests" cho mối quan hệ
});
ApprovalRequest.belongsTo(User, {
  foreignKey: "adminId",
  as: "admin", // Alias "admin" cho mối quan hệ
});

// Export tất cả các model và sequelize
module.exports = {
  sequelize,
  User,
  Course,
  Category,
  StudentCourse,
  Review,
  ApprovalRequest, 
};
