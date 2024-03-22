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
      Joke.belongsToMany(models.User, { through: "UserJokes" });
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
