const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

<<<<<<< HEAD
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false, // Người dùng nhập vào id
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'instructor', 'student'), // Vai trò người dùng
        allowNull: false,
    }

});

module.exports = User;
