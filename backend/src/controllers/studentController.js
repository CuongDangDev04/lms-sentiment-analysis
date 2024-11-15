const  User = require("../models/user"); 
const  Student = require("../models/student"); 


const { register } = require("../controllers/authController"); 

// Tạo mới tài khoản student
exports.createStudent = async (req, res) => {
  const { username, password, fullname, email, id } = req.body;

  // Kiểm tra nếu các trường bắt buộc chưa có
  if (!username || !password || !fullname || !email || !id) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Gọi phương thức register để tạo tài khoản người dùng
  req.body.role = 'student'; // Xác định vai trò là student
  const registrationResult = await register(req, res); // Gọi register để tạo tài khoản người dùng

  if (registrationResult.status !== 201) {
    return res.status(500).json({ message: "Failed to register user!" });
  }

  // Trả về thông báo thành công sau khi đăng ký tài khoản người dùng
  res.status(201).json({
    message: "Student created successfully!",
    user: registrationResult.user,
  });
};

// Lấy tất cả học sinh
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: {
        model: User, // Liên kết với bảng User để lấy thông tin user
        as: "user",
        attributes: ["id", "username", "email"], // Chỉ lấy một số thuộc tính của User
      },
    });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to retrieve students!" });
  }
};

// Lấy chi tiết Student theo ID
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const student = await Student.findByPk(id, {
      include: {
        model: User,
        as: "user",
        attributes: ["id", "username", "email"],
      },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Failed to retrieve student!" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    await student.destroy(); // Xóa Student
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Failed to delete student!" });
  }
};


exports.editStudent = async (req, res) => {
  const { id } = req.params; // Lấy id từ params
  const { user, name } = req.body; // Lấy thông tin từ request body

  const username = user?.username; // Trích xuất username từ user
  const email = user?.email; // Trích xuất email từ user
  const fullname = name; // Ánh xạ name thành fullname

  // Kiểm tra nếu không có trường nào cần cập nhật
  if (!username && !email && !fullname) {
    return res.status(400).json({
      message: "At least one field is required to update!",
      fieldsExpected: ["username", "email", "fullname"],
    });
  }

  try {
    // Tìm Student bao gồm User liên kết
    const student = await Student.findByPk(id, {
      include: {
        model: User,
        as: "user",
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Cập nhật User
    const userToUpdate = student.user;
    if (username) userToUpdate.username = username;
    if (email) userToUpdate.email = email;

    // Cập nhật Student và đồng bộ fullname với User.fullname
    if (fullname) {
      student.name = fullname; // Cập nhật Student.name
      userToUpdate.fullname = fullname; // Đồng bộ fullname với User.fullname
    }

    // Lưu User trước để đảm bảo tính toàn vẹn dữ liệu
    await userToUpdate.save();

    // Lưu Student sau khi cập nhật
    await student.save();

    res.status(200).json({
      message: "Student updated successfully!",
      student,
      user: userToUpdate,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Failed to update student!" });
  }
};
