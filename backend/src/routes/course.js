// routes/courseRoutes.js
const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();

// Lấy danh sách tất cả các khóa học
router.get('/courses', courseController.getAllCourses);

// Lấy thông tin chi tiết khóa học theo id
router.get('/courses/:id', courseController.getCourseById);

// Thêm mới một khóa học
router.post('/courses', courseController.createCourse);

// Cập nhật thông tin khóa học
router.put('/courses/:id', courseController.updateCourse);

// Xóa khóa học
router.delete('/courses/:id', courseController.deleteCourse);

module.exports = router;
