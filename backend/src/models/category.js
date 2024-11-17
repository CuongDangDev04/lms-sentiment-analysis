// models/category.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, // Tự động tăng
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Đảm bảo tên thể loại là duy nhất
    },
  }, 
  {
    timestamps: true, // Sequelize tự động thêm createdAt và updatedAt
  }
);

module.exports = Category;
