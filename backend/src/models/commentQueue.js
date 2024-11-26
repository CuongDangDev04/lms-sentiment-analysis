const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CommentQueue = sequelize.define("CommentQueue", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commentText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  processed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Ban đầu chưa xử lý
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = CommentQueue;
