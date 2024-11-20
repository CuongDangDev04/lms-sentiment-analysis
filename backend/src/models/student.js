const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user"); // Liên kết với bảng User

const Student = sequelize.define(
  "Student",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, // ID tự động tăng
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Tên sinh viên là duy nhất
    },
    avt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      // Thêm khóa ngoại userId
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Liên kết với bảng User
        key: "id",
      },
      onDelete: "CASCADE", // Xóa Student nếu User bị xóa
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

// Thiết lập quan hệ với bảng User
User.hasOne(Student, {
  foreignKey: "userId",
  as: "student",
});

Student.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = Student;
