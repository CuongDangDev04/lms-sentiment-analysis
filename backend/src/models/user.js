const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

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
    avt: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM('admin', 'instructor', 'student'), // Vai trò người dùng
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Đảm bảo email là duy nhất
        validate: {
            isEmail: true, // Kiểm tra định dạng email hợp lệ
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = User;