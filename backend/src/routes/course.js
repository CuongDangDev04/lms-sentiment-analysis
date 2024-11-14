const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/courses", courseController.getAllCourses);

router.get("/:id", courseController.getCourseById);

module.exports = router;
