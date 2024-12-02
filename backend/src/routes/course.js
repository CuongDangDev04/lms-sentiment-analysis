const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Endpoint lấy tất cả khóa học
router.get("/", courseController.getAllCourses);

// Endpoint lấy khóa học theo ID
router.get("/:id", courseController.getCourseById);

router.get("/review/all", courseController.getAllReview);

router.get("/review/instructor/:instructorId", courseController.getAllReviewsByInstructor)

router.get("/review/:courseId", courseController.getReviewOfCourse);

router.post("/review/new", courseController.addComment);
router.delete("/review/:courseId/:studentId", courseController.deleteComment);
router.put("/review/:courseId/:studentId", courseController.updateComment);
router.post("/", courseController.createCourse);

// Endpoint cập nhật khóa học
router.put("/:id", courseController.updateCourse);

// Endpoint xóa khóa học
router.delete("/:id", courseController.deleteCourse);

// Thêm sinh viên vào khóa học ok
router.post("/:id/students", courseController.addStudentToCourse);

// Lấy danh sách sinh viên trong một khóa học  ok
router.get("/:id/students", courseController.getStudentsInCourse);

// Xóa sinh viên khỏi khóa học ok
router.delete("/:id/students", courseController.removeStudentFromCourse);

// Lấy danh sách khóa học mà một sinh viên tham gia ok
router.get("/students/:userId", courseController.getCoursesOfStudent);

router.get(
  "/instructor/:instructorId",
  courseController.getCoursesByInstructor
);

module.exports = router;