"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Joke extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Joke.belongsToMany(models.User, { through: "UserJokes" }); //from before i had a userJoke model
      // Joke.hasMany(models.UserJoke); //i think i need to change to this if i want to use the userJoke model
    }
  }
  Joke.init(
    {
      setUp: DataTypes.STRING,
      punchLine: DataTypes.STRING,
      jokeType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Joke",
    }
  );
  return Joke;
};
