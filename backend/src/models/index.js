const sequelize = require("../config/db");
const User = require("./user");
const Course = require("./course");
const Category = require("./category");
const StudentCourse = require("./studentcourse");
const Review = require('./review');
const ApprovalRequest = require('./ApprovalRequest ');
const SentimentAnalysis = require('./SentimentAnalysis')

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
// ReviewSentiment - User (Liên kết ReviewSentiment với User)
SentimentAnalysis.belongsTo(User, {
  foreignKey: "userId",  // Liên kết khóa ngoại tới User
  as: "user", // Alias "user" cho mối quan hệ ReviewSentiment - User
});

// ReviewSentiment - Course (Liên kết ReviewSentiment với Course)
SentimentAnalysis.belongsTo(Course, {
  foreignKey: "courseId", // Liên kết khóa ngoại tới Course
  as: "course", // Alias "course" cho mối quan hệ ReviewSentiment - Course
});
//cập nhật rating
Review.afterCreate(async (review) => {
  await updateCourseRating(review.courseId);
});

Review.afterUpdate(async (review) => {
  await updateCourseRating(review.courseId);
});

Review.afterDestroy(async (review) => {
  await updateCourseRating(review.courseId);
});

// Hàm cập nhật rating cho course
async function updateCourseRating(courseId) {
  const course = await Course.findByPk(courseId);

  // Tính toán lại trung bình điểm rating của khóa học
  const reviews = await Review.findAll({
    where: { courseId: courseId },
  });

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  // Cập nhật rating cho course
  course.rating = averageRating;
  await course.save();
}
module.exports = {
  sequelize,
  User,
  Course,
  Category,
  StudentCourse,
  Review,
  ApprovalRequest,
  SentimentAnalysis
};
