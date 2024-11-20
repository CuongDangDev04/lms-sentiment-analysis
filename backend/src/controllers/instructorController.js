const bcrypt = require("bcrypt");
const User = require("../models/user");

// Tạo Instructor mới
exports.createInstructor = async (req, res) => {
  const { id, username, password, fullname, email, avt, birthdate, phone } =
    req.body;

  try {
    // Kiểm tra nếu người dùng đã tồn tại
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới với role là 'instructor'
    const newUser = await User.create({
      id,
      username,
      password: hashedPassword,
      fullname,
      email,
      avt,
      birthdate,
      phone,
      role: "instructor", // Role là instructor
    });

    res
      .status(201)
      .json({ message: "Instructor created successfully", user: newUser });
  } catch (error) {
    console.error("Create instructor error:", error);
    res.status(500).json({ message: "Failed to create instructor!" });
  }
};

// Lấy danh sách tất cả Instructor
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await User.findAll({
      where: { role: "instructor" },
    });

    res.status(200).json(instructors);
  } catch (error) {
    console.error("Get all instructors error:", error);
    res.status(500).json({ error: "Failed to get instructor information!" });
  }
};

// Lấy thông tin Instructor theo ID
exports.getInstructorById = async (req, res) => {
  const { id } = req.params;

  try {
    const instructor = await User.findOne({
      where: { id, role: "instructor" },
    });

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found!" });
    }

    res.status(200).json(instructor);
  } catch (error) {
    console.error("Get instructor by ID error:", error);
    res.status(500).json({ error: "Failed to get instructor information!" });
  }
};

// Cập nhật thông tin Instructor
exports.updateInstructor = async (req, res) => {
  const { fullname, email, avt, birthdate, phone } = req.body;

  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid instructor ID" });
    }

    const user = await User.findOne({ where: { id, role: "instructor" } });
    if (!user) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.avt = avt || user.avt;
    user.birthdate = birthdate || user.birthdate;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({ message: "Instructor updated successfully", user });
  } catch (error) {
    console.error("Update instructor error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update instructor information!" });
  }
};

// Xóa Instructor
exports.deleteInstructor = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid instructor ID" });
    }

    const user = await User.findOne({ where: { id, role: "instructor" } });
    if (!user) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    await user.destroy();

    res.status(200).json({ message: "Instructor deleted successfully" });
  } catch (error) {
    console.error("Delete instructor error:", error.message);
    res.status(500).json({ message: "Failed to delete instructor!" });
  }
};
