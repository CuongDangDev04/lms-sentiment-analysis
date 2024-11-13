'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      instructorId: {
        type: Sequelize.INTEGER
      },
      instructorName: {
        type: Sequelize.STRING
      },
      number_of_lessons: {
        type: Sequelize.INTEGER
      },
      number_of_students: {
        type: Sequelize.INTEGER
      },
      certificate: {
        type: Sequelize.BOOLEAN
      },
      rating: {
        type: Sequelize.FLOAT
      },
      duration: {
        type: Sequelize.INTEGER
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      studentsCount: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};