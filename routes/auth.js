require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
// const { Model } = require("sequelize");
const supersecret = process.env.SUPER_SECRET;
const mustExist = require("../guardFunctions/mustExist");
const mustNotExist = require("../guardFunctions/mustNotExist");
const householdShouldBeLoggedIn = require("../guardFunctions/householdShouldBeLoggedIn");

router.post(
  "/register",
  mustNotExist("email", "Households", "email"),
  async function (req, res, next) {
    const { email, password, householdName, public, subUsers } = req.body;
    try {
      const newHouseholdInfo = await models.Household.create({
        email,
        password,
        householdName,
        public,
      });
      // console.log("what came back from the await:");
      // console.log(newHouseholdInfo);
      for (let subUser of subUsers) {
        const { userName, birthYear } = subUser;
        const newSubUser = await models.User.create({
          userName,
          birthYear,
          HouseholdId: newHouseholdInfo.id,
        });
      }
      res.send({ message: `Register succesful` });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  try {
    const household = await models.Household.findOne({
      where: { email },
    });
    if (!household) {
      res.status(401).send({ message: "Household does not exist" });
    } else {
      {
        const correctPassword = await bcrypt.compare(
          password,
          household.password
        );
        if (!correctPassword) {
          res.status(401).send({ message: "Password incorrect" });
        } else {
          const token = jwt.sign({ household_id: household.id }, supersecret);
          res.send({
            message: "Login successful, here is your token",
            token,
          });
        }
      }
    }
  } catch (error) {
    console.log("in auth catch block");
    res.status(500).send(error);
  }
});

router.get(
  "/confirmLogin",
  householdShouldBeLoggedIn,
  async function (req, res) {
    res.send({
      message: "token is valid, user is logged in",
      household: req.household,
    });
  }
);

module.exports = router;
