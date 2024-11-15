const Course = require("../models/course");
const Review = require("../models/review");
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

exports.updateCourse = async (req, res) => {
  const {
    name,
    description,
    instructorId,
    instructorName,
    number_of_lessons,
    number_of_students,
    certificate,
    rating,
    duration,
    imageUrl,
    studentsCount,
    category,
  } = req.body;

  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Khóa học không tồn tại" });
    }

    course.name = name || course.name;
    course.description = description || course.description;
    course.instructorId = instructorId || course.instructorId;
    course.instructorName = instructorName || course.instructorName;
    course.number_of_lessons = number_of_lessons || course.number_of_lessons;
    course.number_of_students = number_of_students || course.number_of_students;
    course.certificate = certificate || course.certificate;
    course.rating = rating || course.rating;
    course.duration = duration || course.duration;
    course.imageUrl = imageUrl || course.imageUrl;
    course.studentsCount = studentsCount || course.studentsCount;
    course.category = category || course.category;

    await course.save();

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật khóa học", error });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Khóa học không tồn tại" });
    }

    await course.destroy();
    res.status(200).json({ message: "Khóa học đã bị xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa khóa học", error });
  }
};

exports.createCourse = async (req, res) => {
  const {
    name,
    description,
    instructorId,
    instructorName,
    number_of_lessons,
    number_of_students,
    certificate,
    rating,
    duration,
    imageUrl,
    studentsCount,
    category,
  } = req.body;
  try {
    const newCourse = await Course.create({
      name,
      description,
      instructorId,
      instructorName,
      number_of_lessons,
      number_of_students,
      certificate,
      rating,
      duration,
      imageUrl,
      studentsCount,
      category,
    });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo khóa học", error });
  }
};
