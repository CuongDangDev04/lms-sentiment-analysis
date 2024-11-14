const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db"); // Kết nối với cơ sở dữ liệu
const authRoutes = require("./routes/auth"); // Routes cho đăng ký và đăng nhập
require("dotenv").config(); // Tải biến môi trường từ .env
const courseRoutes = require('./routes/course');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes); // Đường dẫn cho auth
app.use('/api', courseRoutes);

const PORT = process.env.PORT || 3000;

// Kết nối với cơ sở dữ liệu và khởi động server
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Error connecting to the database:", err));
