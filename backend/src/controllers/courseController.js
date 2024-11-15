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
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching course", error: error.message });
  }
};
exports.getAllReview = async (req, res) => {
  try {
    const reviews = await sequelize.query("SELECT * FROM reviews", {
      type: QueryTypes.SELECT,
    });
    console.log("DCMM" + reviews);
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching review", error: error.message });
  }
};
exports.getReviewOfCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const reviews = await sequelize.query(
      "SELECT * FROM reviews where courseId = $courseId",
      {
        bind: { courseId: courseId },
        type: QueryTypes.SELECT,
      }
    );
    console.log("CCC" + reviews);
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }
    // Trả về mảng thuần túy mà không đóng gói trong một đối tượng
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching review", error: error.message });
  }
};

exports.addComment = async (req, res) => {
  const { id, courseId, rating, comment } = req.body;

  try {
    // Kiểm tra xem các trường cần thiết có tồn tại hay không
    if (!id || !courseId || !rating || !comment) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
    }

    // Tìm review cũ (nếu có) dựa trên id và courseId
    const existingReview = await Review.findOne({
      where: { id, courseId },
    });

    if (existingReview) {
      // Nếu tìm thấy review, cập nhật review đó
      existingReview.rating = rating;
      existingReview.comment = comment;
      await existingReview.save();
      return res.status(200).json(existingReview);
    } else {
      const newReview = await Review.create({
        id,
        courseId,
        rating,
        comment,
      });

      return res.status(201).json(newReview);
    }
  } catch (error) {
    console.error("Lỗi khi thêm hoặc cập nhật comment:", error);
    res.status(500).json({
      message: "Có lỗi xảy ra khi thêm hoặc cập nhật comment",
      error: error.message,
    });
  }
};
