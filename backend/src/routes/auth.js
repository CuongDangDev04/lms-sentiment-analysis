const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

// Endpoint đăng ký
router.post('/register', authController.register);

// Endpoint đăng nhập
router.post('/login', authController.login);

router.get('/user', verifyToken, authController.getUser);

module.exports = router;




//test socket

// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const verifyToken = require('../middleware/verifyToken');

// // Tạo router với io
// module.exports = (io) => {
//   // Endpoint đăng ký
//   router.post('/register', (req, res) => {
//     authController.register(req, res, io);  // Truyền `io` vào controller
//   });

//   // Endpoint phê duyệt instructor
//   router.put('/approve-instructor/:requestId', verifyToken, authController.approveInstructor);

//   // Endpoint đăng nhập
//   router.post('/login', authController.login);

//   // Lấy thông tin người dùng
//   router.get('/user', verifyToken, authController.getUser);

//   return router; // Trả về router đã cấu hình
// };
