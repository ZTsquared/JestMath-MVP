const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const models = require("../models");
// const { Op, Association } = require("sequelize");
const householdShouldBeLoggedIn = require("../guardFunctions/householdShouldBeLoggedIn");
const mustExist = require("../guardFunctions/mustExist");
const mustNotExist = require("../guardFunctions/mustNotExist");

/* GET users listing. */
// TODO: have this check houselhold login and return only the users from within the household.
// router.get("/", async function (req, res, next) {
router.get("/", householdShouldBeLoggedIn, async function (req, res, next) {
  console.log("getting all usernames");
  try {
    const householdID = req.household.id;
    console.log("household id from user route");
    console.log(householdID);
    const users = await models.User.findAll({
      where: {
        HouseholdID: householdID,
      },
      attributes: ["userName", "id"],
    });
    // console.log("hi");
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get(
  "/:userName",
  householdShouldBeLoggedIn,
  async function (req, res, next) {
    console.log("getting a particular user");
    try {
      const { userName } = req.params;
      console.log("-----A-------");
      console.group(userName);
      console.log(req.household.Users);
      const householdUser = req.household.Users.filter(
        (u) => u.userName === userName
      )[0];
      if (householdUser) {
        console.log("------B------");
        console.group(householdUser);
        const user = await models.User.findOne({
          where: {
            id: householdUser.id,
          },
          include: models.Joke,
        });
        res.send(user);
      } else {
        res.status(404).send({
          message: `${userName} is not registered in the ${req.household.householdName} household`,
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// FIXME: to sequelize, but thir route is not used yet anyway
//post a new user.  userName should be unique so we have middleware to check this. the mustNotExist function builds a
// custom guard function based on the table and column name you want to check against (also, maybe a user should get 20 free stars to start? but this is a front end issue)
router.post(
  "/",
  mustNotExist("userName", "users", "userName"),
  async function (req, res, next) {
    console.log(!req.body.userName || !req.body.userName);
    if (!req.body.userName || !req.body.userAge) {
      res.status(400).send({
        msg: "Submission does not contain a valid 'userName' and / or 'userAge' properties",
      });
    }
    const { userName, userAge } = req.body;
    try {
      await db(
        `INSERT INTO users (userName, userAge) values ("${userName}", ${userAge});`
      );
      res.send({
        msg: `User '${userName}' with age '${userAge}' successfully added to database`,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// later i would like to have: - household groupings of users, ability to add users and change a userName from the login page, ability to merge stars and jokes from one account into another if you delete the first,

// increase the user's balance and lifetimeTotal by a quantity specified in the body of the request.
router.put(
  "/:id/increaseBalance/",
  mustExist("id", "users", "id"),
  async function (req, res, next) {
    console.log("put sequelize increaseBalance");
    // console.log(isNaN(+req.body.quantity));
    if (!req.body.quantity || !req.params.id) {
      console.log("if");
      res.status(422).send({ msg: "Submission does not contain valid data" });
    } else if (isNaN(+req.body.quantity)) {
      console.log("else if");
      res.status(422).send({
        msg: "Amount of desired increase must be a number (data type number)",
      });
    } else {
      try {
        console.log("else");
        const { id } = req.params;
        const { quantity } = req.body;
        console.log(id);
        console.log(quantity);
        await models.User.increment(
          { balance: +quantity },
          { where: { id: id } }
        );
        let msg = `User '${id}' balance decreased by ${-quantity}`;
        if (quantity > 0) {
          await models.User.increment(
            { lifetimeTotal: +quantity },
            { where: { id: id } }
          );
          msg = `User '${id}' balance and lifetimeTotal increased by ${quantity}`;
        }
        res.send({
          msg: msg,
        });
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }
);

//TODO: check token, maybe provide user from check login? or provide houselhold from check login and select user here?
router.post(
  "/:id/addJokeToLibrary/",
  mustExist("id", "users", "id"),
  async function (req, res, next) {
    console.log("put sequelize addJokeToLibrary");
    // console.log(isNaN(+req.body.quantity));
    if (!req.body.jokeId || !req.params.id) {
      console.log("if");
      res.status(422).send({ msg: "Submission does not contain valid data" });
    } else {
      try {
        console.log("else");
        const { id } = req.params;
        const { jokeId } = req.body;
        console.log(id);
        console.log(jokeId);
        const user = await models.User.findOne({
          where: {
            id: id,
          },
        });
        await user.addJoke(jokeId);
        res.send({
          msg: `Joke_${jokeId} successfully added to user_${id}'s library`,
        });
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }
);

// FIXME: to sequelize, but thir route is not used yet anyway
// delete a user base on their id.
router.delete(
  "/:id",
  mustExist("id", "users", "id"),
  async function (req, res, next) {
    try {
      const { id } = req.params;
      await db(`DELETE FROM users WHERE id="${id}";`);
      res.send({
        msg: `User with id '${id}' successfully deleted from database`,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

// disallow dupicate user names in the post method using a guard function,
// if household or primary account column is enabled later that function can
// change to make sure there are no duplicates within the household instead of within the database,
// and the get user by userName function can become get by userName become by userName-household

module.exports = router;
