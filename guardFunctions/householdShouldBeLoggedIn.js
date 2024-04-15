var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;
const models = require("../models");
const { Model } = require("sequelize");

function householdShouldBeLoggedIn(req, res, next) {
  // console.log("running should be logged in guard function");
  const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");
  // console.log("TOKEN --------------------");
  // console.log(token);
  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    jwt.verify(token, supersecret, async function (err, decoded) {
      if (err) res.status(401).send({ message: err.message });
      else {
        //everything is awesome
        // console.log("---------decoded----------");
        // console.log(decoded);
        req.household = await models.Household.findOne({
          where: { id: decoded.household_id },
          include: models.User,
        });
        // console.log("---insered data_-----");
        // console.log(req.household);
        next();
      }
    });
  }
}

module.exports = householdShouldBeLoggedIn;
