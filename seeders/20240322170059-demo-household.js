"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcrypt.hashSync("whatever", saltRounds);
    await queryInterface.bulkInsert("Households", [
      {
        householdName: "Demo-Household-1",
        email: "zia.tyebjee@gmail.com",
        password: password,
      },
      {
        householdName: "Demo-Household-2",
        email: "zia@codeop.tech",
        password: password,
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
