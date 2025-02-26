const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user"); 

const ApprovalRequest = sequelize.define("ApprovalRequest", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  instructorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Tham chiếu đến mô hình User
      key: 'id',
    },
    onDelete: 'CASCADE', // Nếu user bị xóa, yêu cầu phê duyệt cũng bị xóa
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: null,
    references: {
      model: User, // Tham chiếu đến mô hình User
      key: 'id',
    },
    onDelete: 'CASCADE', // Nếu user bị xóa, yêu cầu phê duyệt cũng bị xóa
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
});

module.exports = ApprovalRequest;
