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

router.post(
  "/register",
  mustNotExist("email", "households", "email"),
  async function (req, res, next) {
    const { email, password, householdName, subUsers } = req.body;
    try {
      console.log("Request Body:", req.body);
      const newHouseholdInfo = await models.Household.create({
        email,
        password,
        householdName,
      });
      console.log("what came back from the await:");
      console.log(newHouseholdInfo);
      for (let subUser of subUsers) {
        const { userName, birthYear } = subUser;
        const newSubUser = await models.User.create({
          userName,
          birthYear,
          HouseholdId: newHouseholdInfo.id,
        });
        console.log("subuser created:");
        console.log(newSubUser);
      }
      res.send(`Register succesful`);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const household = await models.Household.findOne({
      where: { email },
    });
    console.log("help");

    if (household) {
      const correctPassword = await bcrypt.compare(
        password,
        household.password
      );
      if (!correctPassword) throw new Error("Incorrect password");
      const token = jwt.sign({ household_id: household.id }, supersecret);
      res.send({
        message: "Login successful, here is your token",
        token,
      });
    } else res.status(400).send("user not found");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
