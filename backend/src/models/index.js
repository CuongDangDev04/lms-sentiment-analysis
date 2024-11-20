const sequelize = require("../config/db");
const User = require("./user");
const Course = require("./course");
const Category = require("./category");
const StudentCourse = require("./studentcourse");
const Review = require('./review');
const ApprovalRequest = require('./ApprovalRequest ');

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
  through: StudentCourse,
  as: "students",
  foreignKey: "courseId",
});
User.belongsToMany(Course, {
  through: StudentCourse,
  as: "enrolledCourses",
  foreignKey: "userId",
});

// Thêm mối quan hệ ApprovalRequest - User (Instructor và Admin)
User.hasMany(ApprovalRequest, {
  foreignKey: "instructorId",
  as: "instructorApprovalRequests", // Alias duy nhất cho yêu cầu phê duyệt của instructor
});
ApprovalRequest.belongsTo(User, {
  foreignKey: "instructorId",
  as: "instructor",
});

User.hasMany(ApprovalRequest, {
  foreignKey: "adminId",
  as: "adminApprovalRequests", // Alias duy nhất cho yêu cầu phê duyệt của admin
});
ApprovalRequest.belongsTo(User, {
  foreignKey: "adminId",
  as: "admin",
});

// Review - User (Student)
Review.belongsTo(User, {
  foreignKey: "studentId",
  as: "reviewStudent", // Alias "reviewStudent" cho mối quan hệ Review - User (Student)
});

// Course - Review
Course.hasMany(Review, {
  foreignKey: "courseId",
  as: "courseReviews", // Alias "courseReviews" cho mối quan hệ Course - Review
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
  StudentCourse,
  Review,
  ApprovalRequest,
};
