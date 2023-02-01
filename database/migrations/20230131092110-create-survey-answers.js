'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SurveyAnswers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userSurveyId: {
        type: Sequelize.INTEGER
      },
      surveyId: {
        type: Sequelize.INTEGER
      },
      answerType: {
        type: Sequelize.STRING
      },
      answer: {
        type: Sequelize.STRING
      },
      question: {
        type: Sequelize.STRING
      },
      questionId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('SurveyAnswers');
  }
};