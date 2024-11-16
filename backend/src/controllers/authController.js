const User = require("../models/user");
const Student = require("../models/student");
const Instructor = require("../models/instructor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { id, username, password, fullname, role, email } = req.body;

  if (!id || !username || !password || !fullname || !role || !email) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Kiểm tra xem email đã tồn tại chưa
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists!" });
  }

  // Kiểm tra xem username đã tồn tại chưa
  const existingUsername = await User.findOne({ where: { username } });
  if (existingUsername) {
    return res.status(400).json({ message: "Username already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Tạo người dùng
    const user = await User.create({
      id,
      username,
      password: hashedPassword,
      fullname,
      role,
      email,
    });

    // Tạo bản ghi Student nếu vai trò là student
    if (role === 'student') {
      await Student.create({
        userId: user.id,
        name: fullname, 
        avt: "", // Hoặc trường hợp không có ảnh đại diện, có thể để trống
      });
    }

    // Tạo bản ghi Instructor nếu vai trò là instructor
    if (role === 'instructor') {
      await Instructor.create({
        userId: user.id,
        name: fullname,
        avt: "", // Hoặc trường hợp không có ảnh đại diện, có thể để trống
      });
    }

    res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "User registration failed!" });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra nếu username hoặc password chưa được nhập
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required!" });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "User not found!" });

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password!" });

    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Trả về thông tin người dùng và token
    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        role: user.role,
        email: user.email, 
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
      where: { id: req.userId },
      attributes: ['id', 'username', 'fullname', 'role', 'email'],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Trả về thông tin người dùng
    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Failed to get user information!" });
  }
};