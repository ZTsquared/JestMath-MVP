"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password1 = bcrypt.hashSync("Demo", saltRounds);
    const password2 = bcrypt.hashSync("Demo", saltRounds);

    await queryInterface.bulkInsert("Households", [
      {
        householdName: "Demo-Household-1",
        email: "DemoHousehold1@test.com",
        password: password1,
        public: true,
      },
      {
        householdName: "Demo-Household-2",
        email: "DemoHousehold2@test.com",
        password: password2,
        public: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Households", {
      [Sequelize.Op.or]: [
        { email: "DemoHousehold1@test.com" },
        { email: "DemoHousehold2@test.com" },
      ],
    });
  },
};
