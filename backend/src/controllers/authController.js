const {User} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { id, username, password, fullname, role, email } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!id || !username || !password || !fullname || !role || !email) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Kiểm tra xem username đã tồn tại chưa
    const existingUserByUsername = await User.findOne({ where: { username } });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const user = await User.create({
      id,
      username,
      password: hashedPassword,
      fullname,
      role,
      email,
    });

    res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "User registration failed!" });
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
