"use strict";
const { Model } = require("sequelize");

//THIS MODEL IS NOT USED

module.exports = (sequelize, DataTypes) => {
  class UserJoke extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserJoke.belongsTo(models.User);
      UserJoke.belongsTo(models.Joke);
    }
  }
  UserJoke.init(
    {},
    {
      sequelize,
      modelName: "UserJoke",
      tableName: "userJokes",
    }
  );
  return UserJoke;
};
