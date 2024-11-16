const User = require("../models/user");
const Student = require("../models/student");
const { register } = require("../controllers/authController");

// Tạo mới tài khoản student
exports.createStudent = async (req, res) => {
  const { username, password, fullname, email, id } = req.body;

  if (!username || !password || !fullname || !email || !id) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    req.body.role = "student"; // Đặt vai trò là 'student'
    const registrationResult = await register(req, res);

    if (registrationResult.status !== 201) {
      return res.status(500).json({ message: "Failed to register user!" });
    }

    const userId = registrationResult.user.id;

    const student = await Student.create({
      name: fullname,
      userId,
      avt: req.body.avt || null, // Ảnh đại diện có thể để trống
    });

    res.status(201).json({
      message: "Student created successfully!",
      student,
      role: registrationResult.user.role,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Failed to create student!" });
  }
};

// Lấy danh sách tất cả Student
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["id", "username", "email", "role"], // Bao gồm 'role'
      },
    });

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to retrieve students!" });
  }
};

// Lấy chi tiết một Student theo ID
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByPk(id, {
      include: {
        model: User,
        as: "user",
        attributes: ["id", "username", "email", "role"], // Bao gồm 'role'
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

// Xóa một Student theo ID
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByPk(id, {
      include: {
        model: User,
        as: "user",
        attributes: ["role"], // Bao gồm 'role' để kiểm tra
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Kiểm tra role trước khi xóa
    if (student.user.role !== "student") {
      return res.status(403).json({ message: "Only students can be deleted!" });
    }

    await student.destroy();

    res.status(200).json({ message: "Student deleted successfully!" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Failed to delete student!" });
  }
};

// Chỉnh sửa thông tin Student
exports.editStudent = async (req, res) => {
  const { id } = req.params;
  const { user, name } = req.body;

  const username = user?.username;
  const email = user?.email;
  const fullname = name;

  if (!username && !email && !fullname) {
    return res.status(400).json({
      message: "At least one field is required to update!",
      fieldsExpected: ["username", "email", "fullname"],
    });
  }

  try {
    const student = await Student.findByPk(id, {
      include: {
        model: User,
        as: "user",
        attributes: ["id", "username", "email", "role", "fullname"], // Bao gồm 'role'
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const userToUpdate = student.user;

    if (username) userToUpdate.username = username;
    if (email) userToUpdate.email = email;

    if (fullname) {
      student.name = fullname; // Cập nhật Student.name
      userToUpdate.fullname = fullname; // Đồng bộ fullname
    }

    await userToUpdate.save();
    await student.save();

    res.status(200).json({
      message: "Student updated successfully!",
      student: {
        id: student.id,
        name: student.name,
        role: userToUpdate.role, // Bao gồm 'role'
        user: {
          username: userToUpdate.username,
          email: userToUpdate.email,
          fullname: userToUpdate.fullname,
        },
      },
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Failed to update student!" });
  }
};
