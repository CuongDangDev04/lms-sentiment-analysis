const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, // Người dùng nhập vào id
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  avt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Student;
