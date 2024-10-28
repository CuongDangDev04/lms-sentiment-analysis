const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  // Lấy token từ header Authorization
  const token = req.headers['authorization']?.split(' ')[1];

  // Kiểm tra xem có token không
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Xác thực token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
    
    // Gán thông tin người dùng vào req để sử dụng trong middleware tiếp theo
    req.userId = decoded.id;
    req.userRole = decoded.role;

    // Tiếp tục với middleware tiếp theo
    next();
  });
};
