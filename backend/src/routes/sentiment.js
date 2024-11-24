const express = require('express');
const router = express.Router();
const sentimentController = require('../controllers/sentimentController');

// phân tích tc cho tất cả cmt theo courseId
// router.post("/analyze/:courseId", sentimentController.analyzeCourseReviews);

//pttc theo userid và courseId
router.post('/analyze/:courseId/:userId', sentimentController.analyzeUserCourseReviews);

// API để lấy sentiment analysis theo courseId và userId
router.get('/course/:courseId/user/:userId', sentimentController.getSentimentAnalysisByCourseAndUser);
// API để lấy sentiment analysis theo courseId
router.get('/course/:courseId', sentimentController.getSentimentAnalysisByCourse);
module.exports = router;
