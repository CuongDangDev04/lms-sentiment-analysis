const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./student");

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  courseId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentId: {
    // Thêm khóa ngoại userId
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: "id",
    },
    onDelete: "CASCADE",
  },
});
Student.hasMany(Review, {
  foreignKey: "studentId",
  as: "reviews",
});

Review.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student",
});
module.exports = Review;
