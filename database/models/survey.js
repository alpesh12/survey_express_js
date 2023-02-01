'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Survey.hasMany(models.SurveyQuestions, {
        foreignKey: 'surveyId',
        as: 'questions',
        onDelete: 'CASCADE',
      });
      Survey.hasMany(models.UserSurvey, {
        foreignKey: 'surveyId',
        as: 'userSurveys',
        onDelete: 'CASCADE',
      });
    }
  }
  Survey.init({
    title: DataTypes.STRING,
    surveyId: DataTypes.TEXT,
    adminId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Survey',
  });

  return Survey;
};