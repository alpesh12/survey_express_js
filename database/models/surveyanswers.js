'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurveyAnswers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SurveyAnswers.hasMany(models.AnswerOptions, {
        foreignKey: 'answerId',
        as: 'options',
        onDelete: 'CASCADE',
      });
    }
  }
  SurveyAnswers.init({
    userSurveyId: DataTypes.INTEGER,
    surveyId: DataTypes.INTEGER,
    answerType: DataTypes.STRING,
    answer: DataTypes.STRING,
    question: DataTypes.STRING,
    questionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SurveyAnswers',
  });
  return SurveyAnswers;
};