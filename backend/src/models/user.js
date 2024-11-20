const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: false, // Người dùng nhập vào id
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  avt: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("admin", "instructor", "student"),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  avt: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  birthdate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,  // Mặc định là chưa được phê duyệt
    allowNull: false,
  },
  
});

module.exports = User;
