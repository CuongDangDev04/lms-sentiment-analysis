const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user"); 

const Instructor = sequelize.define(
  "Instructor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, // ID tự động tăng
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Liên kết với bảng User
        key: "id",
      },
      onDelete: "CASCADE", // Xóa Instructor nếu User bị xóa
    },
    avt: {
      type: DataTypes.STRING, // Đường dẫn ảnh đại diện
      allowNull: true, // Có thể để trống
    },
    name: { // Thêm trường name vào model Instructor
      type: DataTypes.STRING, // Kiểu dữ liệu là STRING
      allowNull: false, // Không cho phép giá trị null
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

// Thiết lập quan hệ ngược lại
User.hasOne(Instructor, {
  foreignKey: "userId",
  as: "instructor",
});

Instructor.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = Instructor;