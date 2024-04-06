"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        userName: "TestUser1",
        birthYear: 2015,
        HouseholdId: 1,
      },
      {
        userName: "TestUser2a",
        birthYear: 2014,
        HouseholdId: 2,
      },
      {
        userName: "TestUser2b",
        birthYear: 2017,
        HouseholdId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", {
      [Sequelize.Op.or]: [
        { userName: "TestUser1" },
        { userName: "TestUser2a" },
        { userName: "TestUser2b" },
      ],
    });
  },
};
