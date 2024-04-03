const express = require("express");
const router = express.Router();
// const db = require('../model/helper');
const models = require("../models");
const { Op, Association } = require("sequelize");
const mustExist = require("../guardFunctions/mustExist");
const mustNotExist = require("../guardFunctions/mustNotExist");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const users = await models.User.findAll({
      attributes: ["name", "id"],
    });
    console.log("hi");
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// // get by user id
// router.get('/:userName', mustExist("userName", "users", "userName"), async function(req, res, next) {
//   console.log("getting a particular user")
//   try {
//     const {userName} = req.params;
//     const user = await db(`SELECT * FROM users WHERE userName= "${userName}";`)
//     res.send(user.data[0]);
//   }catch (err) {
//     res.status(500).send(err);
//   }
// });

// this is an old version of the route where i get by userName
router.get(
  "/:userName",
  mustExist("userName", "users", "userName"),
  async function (req, res, next) {
    console.log("getting a particular user");
    try {
      const { userName } = req.params;
      const user = await db(
        `SELECT * FROM users WHERE userName= "${userName}";`
      );
      res.send(user.data[0]);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

router.get(
  "/:id/jokes",
  mustExist("id", "users", "id"),
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const jokes = await db(
        `SELECT * FROM jokes WHERE jokes.id in (select joke_id from usersJokes where user_id = ${id});`
      );
      res.send(jokes.data);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

//post a new user.  userName should be unique so we have middleware to check this. the mustNotExist function builds a
// custom guard function based on the table and column name you want to check against
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

// // add a joke to the user's personal library (via junction table usersJokes).  i have moved this to the usersjokes route.
// router.post('/addToUserLibrary', async function(req, res, next) {
//   console.log(!req.body.user_id || !req.body.joke_id)
//   if (!req.body.user_id  || !req.body.joke_id){
//     res.status(400).send({msg: "Submission does not contain a valid 'user_id' and / or 'joke_id' properties"})
//   }
//   const {user_id, joke_id} = req.body;
//   try {
//     await db(`INSERT INTO usersJokes (user_id, joke_id) values (${user_id}, ${joke_id});`)
//     res.send({msg: `Joke_${joke_id} successfully added to user_${user_id}'s library`});
//   } catch (err){
//     res.status(500).send(err)
//   }
// });

// later i would like to have: - household groupings of users, ability to add users and change a userName from the login page, ability to merge stars and jokes from one account into another if you delete the first,

// increase the user's balance by a quantity specified in the body of the request. quantity property must = a number.
// in reality it might logical to combine this and the function below it into one, since any time you add to the balance you also add to the lifetime total.
// but for now i wrote them individually.
router.put(
  "/:id/increaseBalance/",
  mustExist("id", "users", "id"),
  async function (req, res, next) {
    console.log("put");
    console.log(isNaN(+req.body.quantity));
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
        await db(
          `UPDATE users SET balance = balance+${quantity} WHERE id = "${id}";`
        );
        res.send({ msg: `User '${id}' balance increased by ${quantity}` });
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }
);

//increase lifetime total, similar to increase balance
router.put(
  "/:id/increaseLifetimeTotal/",
  mustExist("id", "users", "id"),
  async function (req, res, next) {
    if (!req.body.quantity || !req.params.id) {
      res.status(422).send({ msg: "Submission does not contain valid data" });
    } else if (isNaN(+req.body.quantity)) {
      res.status(422).send({
        msg: "Amount of desired increase must be an number (data type number)",
      });
    } else {
      try {
        const { id } = req.params;
        const { quantity } = req.body;
        await db(
          `UPDATE users SET lifetimeTotal = lifetimeTotal+${quantity} WHERE id = "${id}";`
        );
        res.send({
          msg: `User '${id}' lifetimeTotal increased by ${quantity}`,
        });
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }
);

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
