const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApprovalRequest = require("../models/ApprovalRequest ");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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
    const isApproved = role === "instructor" ? false : true;

    const user = await User.create({
      id,
      username,
      password: hashedPassword,
      fullname,
      role,
      email,
      isApproved,
      avt: "assets/user.png",
    });

    if (role === "instructor") {
      // Tạo yêu cầu phê duyệt, adminId để null
      await ApprovalRequest.create({
        instructorId: user.id,
        adminId: null, // Chưa có admin nào xử lý
        status: "pending",
      });
    }

    res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "User registration failed!" });
  }
};

exports.approveInstructor = async (req, res) => {
  const { userId } = req.params;
  const { action, adminId } = req.body; // Nhận adminId từ request

  if (!adminId) {
    return res.status(400).json({ message: "Admin ID is required for approval!" });
  }

  try {
    const approvalRequest = await ApprovalRequest.findOne({
      where: { instructorId: userId, status: "pending" },
    });

    if (!approvalRequest) {
      return res.status(404).json({ message: "Approval request not found or already processed!" });
    }

    const instructor = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found!" });
    }

    if (action === "approve") {
      instructor.isApproved = true;
      await instructor.save();

      approvalRequest.status = "approved";
      approvalRequest.adminId = adminId; // Lưu admin đã duyệt
      await approvalRequest.save();

      return res.status(200).json({
        message: "Instructor approved successfully!",
        approvalRequest,
        instructor,
      });
    } else if (action === "reject") {
      approvalRequest.status = "rejected";
      approvalRequest.adminId = adminId;
      await approvalRequest.save();

      return res.status(200).json({
        message: "Instructor rejected, but account is not deleted automatically.",
      });
    } else {
      return res.status(400).json({ message: "Invalid action!" });
    }
  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ error: "Failed to approve or reject instructor." });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra nếu thiếu thông tin đăng nhập
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  }

  try {
    // Tìm người dùng theo username
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "User not found!" });

    // Kiểm tra xem người dùng đã được phê duyệt chưa
    if (!user.isApproved) {
      return res
        .status(403)
        .json({ message: "Your account has not been approved yet!" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password!" });

    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    // Trả về các thông tin cần thiết và token
    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        role: user.role,
        username: user.username,
      },
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
      where: { id: req.userId }, // Tìm người dùng theo ID
    });

    // Nếu không tìm thấy người dùng, trả về lỗi 404
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Trả về các thông tin cần thiết của người dùng
    res.status(200).json({
      user: {
        id: user.id,
        fullname: user.fullname,
        role: user.role,
        username: user.username,
        avt: user.avt,
        phone: user.phone,
        birthdate: user.birthdate,
        email: user.email
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Failed to get user information!" });
  }
};
