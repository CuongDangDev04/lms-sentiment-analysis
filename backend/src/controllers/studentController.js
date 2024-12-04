const bcrypt = require("bcrypt");
const User = require("../models/user");

// Tạo mới tài khoản student
exports.createStudent = async (req, res) => {
  const { id, username, password, fullname, email, avt, birthdate, phone } =
    req.body;

  if (!username || !password || !fullname || !email) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided!" });
  }

  try {
    // Kiểm tra xem email hoặc username đã tồn tại hay chưa
    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    const existingUserByUsername = await User.findOne({ where: { username } });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already in use!" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo tài khoản mới với role là 'student'
    const newUser = await User.create({
      id,
      username,
      password: hashedPassword,
      fullname,
      email,
      avt: "assets/user.png",
      phone,
      role: "student", // Role mặc định là student
      isApproved: true, // Sinh viên mặc định được phê duyệt
    });

    // Trả về thông báo thành công
    res.status(201).json({
      message: "Student created successfully!",
      user: newUser,
    });
  } catch (error) {
    console.error("Create student error:", error);
    res.status(500).json({ message: "Failed to create student!" });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    // Lấy tất cả người dùng với role là 'student'
    const students = await User.findAll({
      where: { role: "student" },
    });

    // Trả về danh sách sinh viên
    res.status(200).json(
      students // Trả về tất cả người dùng có role là 'student'
    );
  } catch (error) {
    console.error("Get all students error:", error);
    try {
      // Tìm người dùng theo ID và role là 'student'
      const student = await User.findOne({
        where: { id, role: "student" },
      });

      // Nếu không tìm thấy người dùng, trả về lỗi 404

      // Trả về thông tin sinh viên
      res.status(200).json(student);
    } catch (error) {
      console.error("Get student by ID error:", error);
      res.status(500).json({ error: "Failed to get student information!" });
    }
  }
};
exports.getStudentById = async (req, res) => {
  const { id } = req.params; // Lấy id từ params

  try {
    // Tìm người dùng theo ID và role là 'student'
    const student = await User.findOne({
      where: { id, role: "student" },
    });

    // Nếu không tìm thấy người dùng, trả về lỗi 404
    if (!student) {
      return res.status(404).json({ message: "Student not found!" });
    }

    // Trả về thông tin sinh viên
    res.status(200).json(
      student // Trả về thông tin sinh viên theo ID
    );
  } catch (error) {
    console.error("Get student by ID error:", error);
    res.status(500).json({ error: "Failed to get student information!" });
  }
};

exports.updateStudent = async (req, res) => {
  const { fullname, email, avt, birthdate, phone } = req.body;

  try {
    // Kiểm tra và parse `id`
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Log params để kiểm tra
    console.log("Params:", req.params);
    console.log("Parsed ID:", id);

    // Kiểm tra người dùng tồn tại
    const user = await User.findOne({ where: { id, role: "student" } });
    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Cập nhật thông tin người dùng
    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.avt = avt || user.avt;
    user.birthdate = birthdate || user.birthdate;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({ message: "Student updated successfully", user });
  } catch (error) {
    console.error("Update student error:", error.message);
    res.status(500).json({ message: "Failed to update student information!" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    // Parse `id` từ `req.params` để tìm đúng người dùng
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Kiểm tra người dùng tồn tại
    const user = await User.findOne({ where: { id, role: "student" } });
    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Xóa người dùng
    await user.destroy();

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Delete student error:", error.message);
    res.status(500).json({ message: "Failed to delete student!" });
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
