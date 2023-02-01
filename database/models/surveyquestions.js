'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SurveyQuestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SurveyQuestions.hasMany(models.QuestionOptions, {
        foreignKey: 'questionId',
        as: 'options',
        onDelete: 'CASCADE',
      });
    }
  }
  SurveyQuestions.init({
    question: DataTypes.STRING,
    surveyId: DataTypes.INTEGER,
    answerType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SurveyQuestions',
  });
  return SurveyQuestions;
};