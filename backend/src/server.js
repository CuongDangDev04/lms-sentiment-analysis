const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db"); // Kết nối với cơ sở dữ liệu
const authRoutes = require("./routes/auth"); // Routes cho đăng ký và đăng nhập
const studentRoutes = require('./routes/student');
const courseRoutes = require('./routes/course')
const instructorRoutes = require("./routes/intructor");
const categoryRoutes = require('./routes/category')

const app = express();

require('./models')
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes); // Đường dẫn cho auth
app.use("/api/instructor", instructorRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/course", courseRoutes);

const PORT = process.env.PORT || 5000;

// // Kết nối với cơ sở dữ liệu và khởi động server
// sequelize.sync({ force: false }) // hoặc { alter: true } để tránh việc xóa bảng nếu đã tồn tại
//   .then(() => {
//     console.log("Database synced");
//   })
//   .catch((err) => {
//     console.error("Error syncing database:", err);
//   });
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Error connecting to the database:", err));
