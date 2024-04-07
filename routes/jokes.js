var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const models = require("../models");
// const { Op, Association, random } = require("sequelize");
const Sequelize = require("sequelize");
const mustExist = require("../guardFunctions/mustExist");
const mustNotExist = require("../guardFunctions/mustNotExist");

// get full jokes list (not used in app but useful for postman)
router.get("/", async function (req, res, next) {
  try {
    const jokes = await models.Joke.findAll();
    res.send(jokes);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get joke by id (not used in app but useful for postman)
router.get(
  "/:id",
  mustExist("id", "jokes", "id"),
  async function (req, res, next) {
    // console.log("getting a particular joke")
    try {
      const { id } = req.params;
      //  this if clause checks whether the param you passed in this position is a number
      //  if it is it processes it as an id, if it is not it allows the router to move on to try other routes (like /random)
      if (isNaN(+id)) {
        next();
      } else {
        const joke = await models.Joke.findOne({
          // attributes: ["id", "jokeType", "setUp", "punchLine"],
          where: {
            id: id,
          },
        });
        res.send(joke);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

//getone random joke that is not in the current user's library
// TODO: this route needs to get one that ISN'T ALREADY IN USER LIBRARY
router.get("/random", async function (req, res, next) {
  // console.log("getting a random joke")
  try {
    const { user_id } = req.query;
    const joke = await models.Joke.findOne({
      attributes: ["id", "jokeType", "setUp", "punchLine"],
      order: Sequelize.literal("rand()"),
    });
    res.send(joke);
  } catch (err) {
    res.status(500).send(err);
  }
});

// post a joke.  requires a setup, a punchline, and a joke type.
// Joke types currently are riddle (for which a setup and punchline form the entier joke)
// and knock knock, which require extra standard lines when displayed (knock knok, who's there etc)
// In future I would like to add comics strips as a 3rd joke type as a way to practice using images,
// In that case maybe the setup would need to be either the comic's name or null and the punchline would contain the image path?

// FIXME: to sequelize (not used in app but useful for postman)
router.post("/", async function (req, res, next) {
  const allowableTypes = ["knockknock", "riddle", "comic"];
  if (!req.body.setUp || !req.body.punchLine || !req.body.jokeType) {
    res
      .status(400)
      .send({ msg: "Submission does not contain required properties" });
  }
  // below is a little forced formating of the joke type.  might not be necessary later if i build a selection drop down for this
  // or if i populate the jokes from an api
  else if (
    !allowableTypes.includes(
      req.body.jokeType.toLowerCase().replaceAll(" ", "")
    )
  ) {
    res
      .status(400)
      .send({ msg: `Only joke types ${allowableTypes} can be entered` });
  } else {
    let { setUp, punchLine, jokeType } = req.body;
    jokeType = jokeType.toLowerCase().replaceAll(" ", "");
    // post:
    try {
      await db(
        `INSERT INTO jokes (setUp, punchLine, jokeType) values ("${setUp}", "${punchLine}", "${jokeType}");`
      );
      const resultObject = await db(
        `SELECT * FROM jokes ORDER BY ID DESC LIMIT 1;`
      );
      resultObject.msg = `'${jokeType}' type joke successfully added to database`;
      res.send(resultObject);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

module.exports = router;
