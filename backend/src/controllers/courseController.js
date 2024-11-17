const Course = require("../models/course");  
const User = require("../models/user");
const Category = require("../models/category");

// Tạo mới khóa học
exports.createCourse = async (req, res) => {
  try {
    const { name, description, instructorId, number_of_lessons, number_of_students, rating, duration, imageUrl, categoryId } = req.body;

    // Kiểm tra xem giảng viên có hợp lệ không
    const instructor = await User.findOne({ where: { id: instructorId, role: 'instructor' } });
    if (!instructor) {
      return res.status(400).json({ error: "Instructor must have role 'instructor'" });
    }

    // Kiểm tra xem danh mục có tồn tại không
    const category = await Category.findByPk(categoryId);  // Đổi categoryId thành id
    if (!category) {
      return res.status(400).json({ error: "Category not found" });
    }

    // Tạo khóa học mới
    const course = await Course.create({
      name,
      description,
      instructorId,
      number_of_lessons,
      number_of_students,
      rating,
      duration,
      imageUrl,
      categoryId,  // Đổi categoryId thành id
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: "instructor",
          attributes: ["id", "fullname", "email"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        }
      ]
    });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy khóa học theo ID
exports.getCourseById = async (req, res) => {
  const { id } = req.params;  // Đổi courseId thành id
  console.log(id);
  // Kiểm tra xem id có phải là số nguyên hay không
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  try {
    const course = await Course.findByPk(id, {  // Đổi courseId thành id
      include: [
        {
          model: User,
          as: "instructor",
          attributes: ["id", "fullname", "email"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        }
      ]
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error(err);  // Để dễ dàng debug
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật khóa học
exports.updateCourse = async (req, res) => {
  const { id } = req.params;  // Đổi courseId thành id
  const { name, description, number_of_lessons, number_of_students, rating, duration, imageUrl, categoryId } = req.body;  // Đổi categoryId thành id

  try {
    const course = await Course.findByPk(id);  // Đổi courseId thành id
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Kiểm tra xem danh mục có tồn tại không
    const category = await Category.findByPk(categoryId);  // Đổi categoryId thành id
    if (!category) {
      return res.status(400).json({ error: "Category not found" });
    }

    // Cập nhật thông tin khóa học
    course.name = name || course.name;
    course.description = description || course.description;
    course.number_of_lessons = number_of_lessons || course.number_of_lessons;
    course.number_of_students = number_of_students || course.number_of_students;
    course.rating = rating || course.rating;
    course.duration = duration || course.duration;
    course.imageUrl = imageUrl || course.imageUrl;
    course.categoryId = categoryId || course.categoryId;  // Đổi categoryId thành id

    await course.save();

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa khóa học
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;  // Đổi courseId thành id
  try {
    const course = await Course.findByPk(id);  // Đổi courseId thành id
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    await course.destroy();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
