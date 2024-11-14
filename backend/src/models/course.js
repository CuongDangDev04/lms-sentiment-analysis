const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const Course = sequelize.define('Course', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  instructorId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  instructorName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  number_of_lessons: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  number_of_students: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  certificate: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  studentsCount: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  }
});
 module.exports = Course;
