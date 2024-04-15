"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Household);
      User.belongsToMany(models.Joke, { through: "UserJokes" }); //from before i had a userJoke model
      // User.hasMany(models.UserJoke); //i think i need to change to this if i want to use the userJoke model
      User.belongsToMany(models.Question, { through: "UserQuestions" });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      birthYear: DataTypes.INTEGER,
      balance: DataTypes.INTEGER,
      lifetimeTotal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
