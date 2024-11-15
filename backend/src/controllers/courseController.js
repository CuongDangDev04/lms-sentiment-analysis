const { QueryTypes } = require("sequelize");
const Course = require("../models/course");
const Review = require("../models/review");
const sequelize = require("../config/db");
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to retrieve students!" });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ course });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching course", error: error.message });
  }
};

exports.getReviewOfCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const review = await sequelize.query(
      "SELECT * FROM reviews where courseId = $courseId",
      {
        bind: { courseId: courseId },
        type: QueryTypes.SELECT,
      }
    );
    console.log(review);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ review });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching review", error: error.message });
  }
};
