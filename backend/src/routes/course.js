const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/", courseController.getAllCourses);

router.get("/:id", courseController.getCourseById);
router.get("/review/all", courseController.getAllReview);
router.get("/review/:courseId", courseController.getReviewOfCourse);

router.post("/review/new", courseController.addComment);
router.post("/", courseController.createCourse);

router.put("/:id", courseController.updateCourse);

router.delete("/:id", courseController.deleteCourse);
module.exports = router;
