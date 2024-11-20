const Course = require("../models/course");
const User = require("../models/user");
const Category = require("../models/category");
const StudentCourse = require("../models/studentcourse")
// Tạo mới khóa học
exports.createCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      instructorId,
      number_of_lessons,
      number_of_students,
      rating,
      duration,
      imageUrl,
      categoryId,
    } = req.body;

    // Kiểm tra xem giảng viên có hợp lệ không
    const instructor = await User.findOne({
      where: { id: instructorId, role: "instructor" },
    });
    if (!instructor) {
      return res
        .status(400)
        .json({ error: "Instructor must have role 'instructor'" });
    }

    // Kiểm tra xem danh mục có tồn tại không
<<<<<<< HEAD
    const category = await Category.findByPk(categoryId);  
=======
    const category = await Category.findByPk(categoryId); // Đổi categoryId thành id
>>>>>>> 380e88b138faffb6177b4bcf9a29d85e9617b01c
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
<<<<<<< HEAD
      categoryId,  
=======
      categoryId, // Đổi categoryId thành id
>>>>>>> 380e88b138faffb6177b4bcf9a29d85e9617b01c
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
        },
      ],
    });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy khóa học theo ID
exports.getCourseById = async (req, res) => {
<<<<<<< HEAD
  const { id } = req.params; 
=======
  const { id } = req.params; // Đổi courseId thành id
>>>>>>> 380e88b138faffb6177b4bcf9a29d85e9617b01c
  console.log(id);
  // Kiểm tra xem id có phải là số nguyên hay không
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  try {
<<<<<<< HEAD
    const course = await Course.findByPk(id, { 
=======
    const course = await Course.findByPk(id, {
      // Đổi courseId thành id
>>>>>>> 380e88b138faffb6177b4bcf9a29d85e9617b01c
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
        },
      ],
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
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

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching review", error: error.message });
  }
};

exports.addComment = async (req, res) => {
  const { studentId, courseId, rating, comment } = req.body;

  try {
    // Kiểm tra xem các trường cần thiết có tồn tại hay không
    if (!studentId || !courseId || !rating || !comment) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
    }

    // Tìm review cũ (nếu có) dựa trên id và courseId
    const existingReview = await Review.findOne({
      where: { studentId, courseId },
    });

    if (existingReview) {
      // Nếu tìm thấy review, cập nhật review đó
      existingReview.rating = rating;
      existingReview.comment = comment;
      await existingReview.save();
      return res.status(200).json(existingReview);
    } else {
      const newReview = await Review.create({
        courseId,
        rating,
        comment,
        studentId,
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

// Cập nhật khóa học
exports.updateCourse = async (req, res) => {
  const { id } = req.params; // Đổi courseId thành id
  const {
    name,
    description,
    number_of_lessons,
    number_of_students,
    rating,
    duration,
    imageUrl,
    categoryId,
  } = req.body; // Đổi categoryId thành id

  try {
    const course = await Course.findByPk(id); // Đổi courseId thành id
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Kiểm tra xem danh mục có tồn tại không
    const category = await Category.findByPk(categoryId); // Đổi categoryId thành id
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
<<<<<<< HEAD
    course.categoryId = categoryId || course.categoryId; 
=======
    course.categoryId = categoryId || course.categoryId; // Đổi categoryId thành id
>>>>>>> 380e88b138faffb6177b4bcf9a29d85e9617b01c

    await course.save();

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa khóa học
exports.deleteCourse = async (req, res) => {
  const { id } = req.params; // Đổi courseId thành id
  try {
    const course = await Course.findByPk(id); // Đổi courseId thành id
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    await course.destroy();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Thêm sinh viên vào khóa học ok
exports.addStudentToCourse = async (req, res) => {
  try {
      const { id } = req.params; // Đây là courseId
      const { userId } = req.body; // Đây là userId của sinh viên

      // Kiểm tra xem khóa học có tồn tại không
      const course = await Course.findByPk(id);
      if (!course) {
          return res.status(404).json({ error: "Course not found" });
      }

      // Kiểm tra xem sinh viên có tồn tại và có vai trò là "student" không
      const student = await User.findOne({ where: { id: userId, role: "student" } });
      if (!student) {
          return res.status(400).json({ error: "User must be a student" });
      }

      // Kiểm tra xem sinh viên đã trong khóa học chưa
      const existingRecord = await StudentCourse.findOne({ where: { userId, courseId: id } });
      if (existingRecord) {
          return res.status(400).json({ error: "Student is already enrolled in this course" });
      }

      // Thêm sinh viên vào khóa học
      await StudentCourse.create({ userId, courseId: id });
      res.status(201).json({ message: "Student added to course successfully" });
  } catch (err) {
      console.error(err); // Để debug
      res.status(500).json({ error: err.message });
  }
};



// Lấy danh sách sinh viên trong một khóa học ok
exports.getStudentsInCourse = async (req, res) => {
  const { id } = req.params;  


  try {
    // Tìm khóa học bằng `id`
    const course = await Course.findByPk(id);  
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Lấy danh sách sinh viên trong khóa học
    const students = await Course.findAll({
      where: { id },  
      include: [
        {
          model: User,
          as: "students",  
          attributes: ["id", "fullname", "email", "phone", "birthdate"],
        },
      ],
    });

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa sinh viên khỏi khóa học ok 
exports.removeStudentFromCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Kiểm tra xem bản ghi có tồn tại không
    const record = await StudentCourse.findOne({ where: { userId, courseId } });
    if (!record) {
      return res.status(404).json({ error: "Student is not enrolled in this course" });
    }

    // Xóa bản ghi
    await record.destroy();
    res.status(200).json({ message: "Student removed from course successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy danh sách khóa học mà một sinh viên tham gia ok
exports.getCoursesOfStudent = async (req, res) => {
  const { userId } = req.params;

  try {
    // Kiểm tra xem sinh viên có tồn tại không
    const student = await User.findOne({ where: { id: userId, role: "student" } });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Lấy danh sách khóa học mà sinh viên tham gia
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: "students",  // Sử dụng alias "students" trong mối quan hệ "Course belongsToMany User"
          where: { id: userId },  // Lọc các sinh viên theo userId
          attributes: ["id", "fullname", "email", "phone", "birthdate"], // Chọn thuộc tính cần thiết
        },
      ],
    });

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



