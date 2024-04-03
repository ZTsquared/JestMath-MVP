"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "TestUser1",
        birthYear: 2015,
        HouseholdId: 1,
      },
      {
        name: "TestUser2a",
        birthYear: 2014,
        HouseholdId: 2,
      },
      {
        name: "TestUser2b",
        birthYear: 2017,
        HouseholdId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", {
      [Sequelize.Op.or]: [
        { name: "TestUser1" },
        { name: "TestUser2a" },
        { name: "TestUser2b" },
      ],
    });
  },
};
