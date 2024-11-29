const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db"); // Kết nối với cơ sở dữ liệu
const authRoutes = require("./routes/auth"); // Routes cho đăng ký và đăng nhập
const studentRoutes = require("./routes/student");
const courseRoutes = require("./routes/course");
const instructorRoutes = require("./routes/intructor");
const categoryRoutes = require("./routes/category");
const sentimentRoutes = require("./routes/sentiment");
const feedbackRoutes = require("./routes/feedback");
const app = express();

// Các cấu hình Express
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/sentiment/", sentimentRoutes);
app.use("/api/feedback", feedbackRoutes);
const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Error connecting to the database:", err));
