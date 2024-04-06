"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Households", [
      {
        householdName: "Demo-Household-1",
        email: "zia.tyebjee@gmail.com",
      },
      {
        householdName: "Demo-Household-2",
        email: "zia@codeop.tech",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Households", {
      [Sequelize.Op.or]: [
        { email: "zia.tyebjee@gmail.com" },
        { email: "zia@codeop.tech" },
      ],
    });
  },
};
