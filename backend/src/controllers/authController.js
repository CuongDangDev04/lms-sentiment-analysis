const {User} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApprovalRequest = require('../models/ApprovalRequest ')
exports.register = async (req, res) => {
  const { id, username, password, fullname, role, email } = req.body;

  if (!username || !password || !fullname || !role || !email) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const existingUserByUsername = await User.findOne({ where: { username } });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Gán giá trị mặc định cho `isApproved` tùy theo role
    const isApproved = role === "instructor" ? false : true;

    const user = await User.create({
      id,
      username,
      password: hashedPassword,
      fullname,
      role,
      email,
      isApproved,  // Gán giá trị isApproved tùy theo role
    });

    if (role === "instructor") {
      // Tạo yêu cầu phê duyệt cho instructor
      await ApprovalRequest.create({
        instructorId: user.id,
        adminId: 0, // Chưa có admin xử lý yêu cầu
        status: "pending", // Yêu cầu đang chờ
      });
    }

    res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "User registration failed!" });
  }
};
exports.approveInstructor = async (req, res) => {
  const { requestId } = req.params;  // Lấy requestId từ URL params

  try {
    // Lấy yêu cầu phê duyệt từ requestId
    const approvalRequest = await ApprovalRequest.findByPk(requestId);

    if (!approvalRequest) {
      return res.status(404).json({ message: "Approval request not found!" });
    }

    // Kiểm tra trạng thái yêu cầu phê duyệt
    if (approvalRequest.status !== "pending") {
      return res.status(400).json({ message: "This request has already been processed." });
    }

    // Lấy thông tin giảng viên (instructor) liên quan đến yêu cầu phê duyệt
    const instructor = await User.findByPk(approvalRequest.instructorId, {
      attributes: { exclude: ['password'] }  // Loại bỏ mật khẩu
    });

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found!" });
    }

    // Trả về thông tin giảng viên và yêu cầu phê duyệt
    res.status(200).json({
      message: "Instructor details retrieved successfully!",
      approvalRequest,
      instructor,  // Trả về thông tin giảng viên trừ mật khẩu
    });

    // Cập nhật trạng thái phê duyệt
    instructor.isApproved = true;
    await instructor.save();

    // Cập nhật trạng thái yêu cầu phê duyệt
    approvalRequest.status = "approved";
    await approvalRequest.save();

  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ error: "Failed to approve instructor." });
  }
};



exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra nếu thiếu thông tin đăng nhập
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required!" });
  }

  try {
    // Tìm người dùng theo username
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "User not found!" });

     // Kiểm tra xem người dùng đã được phê duyệt chưa
     if (!user.isApproved) {
      return res.status(403).json({ message: "Your account has not been approved yet!" });
    }
    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password!" });

    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Trả về toàn bộ thông tin người dùng và token
    res.status(200).json({
      message: "Login successful!",
      token,
      user: user // Trả về tất cả thuộc tính của người dùng
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed!" });
  }
};
exports.getUser = async (req, res) => {
  try {
    // Lấy thông tin người dùng từ req.userId (được xác thực từ middleware)
    const user = await User.findOne({
      where: { id: req.userId }  // Tìm người dùng theo ID
    });

    // Nếu không tìm thấy người dùng, trả về lỗi 404
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Trả về tất cả thông tin người dùng
    res.status(200).json({
      user: user // Trả về toàn bộ thông tin của người dùng
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Failed to get user information!" });
  }
};
