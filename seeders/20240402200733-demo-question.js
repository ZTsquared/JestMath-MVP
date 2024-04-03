"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Questions", [
      {
        question: "17 + 48",
        answer: "65",
      },
      {
        question: "92 + 72",
        answer: "164",
      },
      {
        question: "35 * 2",
        answer: "70",
      },
      {
        question: "24 / 2",
        answer: "12",
      },
      {
        question: "93 / 3",
        answer: "31",
      },
      {
        question: "7 * 5",
        answer: "35",
      },
      {
        question: "290 / 2",
        answer: "145",
      },
      {
        question: "75 + 13 + 120",
        answer: "208",
      },
      {
        question: "2 * 2 * 2",
        answer: "8",
      },
      {
        question: "3 * 46",
        answer: "138",
      },
      {
        question: "110 / 11",
        answer: "10",
      },
      {
        question: "39 / 3",
        answer: "13",
      },
      {
        question: "756 + 39",
        answer: "795",
      },
      {
        question: "68 - 32",
        answer: "36",
      },
      {
        question: "170 - 94",
        answer: "76",
      },
      {
        question: "22 * 3",
        answer: "66",
      },
      {
        question: "835 - 250",
        answer: "585",
      },
      {
        question: "35 - 12",
        answer: "23",
      },
      {
        question: "3 * 3 * 3",
        answer: "27",
      },
      {
        question: "4 * 2 * 3",
        answer: "24",
      },
      {
        question: "12 * 3",
        answer: "36",
      },
      {
        question: "8 * 8",
        answer: "64",
      },
      {
        question: "17 - 20",
        answer: "-3",
      },
      {
        question: "2 - 97",
        answer: "-95",
      },
      {
        question: "45 - 100",
        answer: "-55",
      },
      {
        question: "9 - 15",
        answer: "-6",
      },
      {
        question: "44 / 11",
        answer: "4",
      },
      {
        question: "12 / 3",
        answer: "4",
      },
      {
        question: "963 / 3",
        answer: "321",
      },
      {
        question: "42 / 2",
        answer: "21",
      },
      {
        question: "3 * 7 * 2",
        answer: "42",
      },
      {
        question: "420 * 2",
        answer: "840",
      },
      {
        question: "85 * 2",
        answer: "170",
      },
      {
        question: "23 * 3",
        answer: "69",
      },
      {
        question: "9 * 5",
        answer: "45",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Questions", null, {});
  },
};
