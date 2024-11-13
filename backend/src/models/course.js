'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    instructorId: DataTypes.INTEGER,
    instructorName: DataTypes.STRING,
    number_of_lessons: DataTypes.INTEGER,
    number_of_students: DataTypes.INTEGER,
    certificate: DataTypes.BOOLEAN,
    rating: DataTypes.FLOAT,
    duration: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    studentsCount: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};