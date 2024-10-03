"use strict";

const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "HouseholdId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        // this line above created a problem.  It should have been model: "Household" not model "User".
        // This worked fine locally but after i deployed on heroku i started having problems - foreign key errors when registering households and creating users
        // I am not sure how to fix this with a new later migration, so instead i fixed it directly in my stackhere mysql database with the following commands:
        //
        // ALTER TABLE Users
        // DROP FOREIGN KEY Users_HouseholdId_foreign_idx;

        // ALTER TABLE Users
        // ADD CONSTRAINT Users_HouseholdId_fk
        // FOREIGN KEY (HouseholdId)
        // REFERENCES Households(id)
        // ON DELETE CASCADE
        // ON UPDATE CASCADE;
        //
        // So it works now, but if i were to use these migrations to create a new database i should either fix this migration beforehand or fix it again for the new database after the fact.
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Users", "HouseholdId");
  },
};
