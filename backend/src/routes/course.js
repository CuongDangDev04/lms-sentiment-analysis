const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Endpoint lấy tất cả khóa học
router.get("/", courseController.getAllCourses);

// Endpoint lấy khóa học theo ID
router.get("/:id", courseController.getCourseById);

// Endpoint tạo khóa học mới
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



module.exports = router;
