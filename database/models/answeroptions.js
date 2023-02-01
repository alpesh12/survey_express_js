'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerOptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AnswerOptions.init({
    answerId: DataTypes.INTEGER,
    optionId: DataTypes.INTEGER,
    answer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AnswerOptions',
  });
  return AnswerOptions;
};