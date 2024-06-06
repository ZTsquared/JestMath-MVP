const express = require("express");
//once I have fully sequelized delete this db line from all route files and archive the db helpers in the unused folders
const db = require("../model/helper");
const models = require("../models");
const Sequelize = require("sequelize");
const router = express.Router();
const calculateAnswer = require("../guardFunctions/calculateAnswer");
const mustExist = require("../guardFunctions/mustExist");

// get full question list
router.get("/", async function (req, res, next) {
  try {
    // const questions = await db("SELECT * FROM questions;");
    const questions = await models.Question.findAll();
    res.send(questions);
  } catch (err) {
    res.status(500).send(err);
  }
});

// at the moment i don't use :id or /count but i built them so i'll leave them here for later
router.get(
  "/:id",
  mustExist("id", "questions", "id"),
  async function (req, res, next) {
    console.log("getting a particular question");
    try {
      const { id } = req.params;
      //  this if clause checks whether the param you passed in this position is a number
      //  if it is it processes it as an id, if it is not it allows the router to move on to try other routes (like /count)
      if (isNaN(+id)) {
        next();
      } else {
        const question = await models.Question.findOne({
          where: {
            id: id,
          },
        });
        res.send(question);
      }
    } catch (err) {
      res.status(500).send(err);
    }
    // res.send("nothing");
  }
);

//get questions count - this is purely a tool to quickly check the count with postman
router.get("/count", async function (req, res, next) {
  try {
    const questions = await models.Question.findAll();
    const count = questions.length;
    console.log(count);
    res.send(`there are ${count} questions`);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get a specified number of random questions
router.get("/random/:count", async function (req, res, next) {
  const { count } = req.params;
  try {
    const questions = await models.Question.findAll({
      order: Sequelize.literal("rand()"),
      limit: Number(count),
    });
    res.send(questions);
  } catch (err) {
    res.status(500).send(err);
  }
});

//FIXME: to sequelize
// post a question.  Must post the question in syntax that javascript can evaluate and calculate an answer for
// otherwise the calculate answer guard function will reject it
router.post("/", calculateAnswer, async function (req, res, next) {
  const { question } = req.body;
  const answer = req.params.answer;
  try {
    res.send({
      msg: `Question '${question}' with answer '${answer}' recieved`,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

//this is the functioning route,  which should be activated once I am ready to let users add questions to the database
router.post("/", calculateAnswer, async function (req, res, next) {
  const { question } = req.body;
  const answer = req.params.answer;
  try {
    // post:
    await db(
      `INSERT INTO questions (question, answer) values ("${question}", "${answer}");`
    );
    // get the new question object back (i may not need this but i am toying with showing it on the screen after you post it):
    const resultObject = await db(
      `SELECT * FROM questions ORDER BY ID DESC LIMIT 1;`
    );
    // add a message to the body of the result for future use - currently I show the user this message.
    resultObject.msg = `Question '${question}' with answer '${answer}' successfully added to database`;
    res.send(resultObject);
  } catch (err) {
    res.status(500).send(err);
  }
});

// delete a question.  so far I don't use this but in future i would like to make it possible the parent to curate the questions
// FIXME: this isn't used, but if i use it i should sequelize it
router.delete(
  "/:id",
  mustExist("id", "questions", "id"),
  async function (req, res, next) {
    const { id } = req.params;
    if (isNaN(+id)) {
      next();
    }
    try {
      await db(`DELETE FROM questions WHERE id=${id};`);
      res.send({
        msg: `Question with id '${id}' successfully deleted from database`,
      });
      // is there a way to send the following without running a 'get' to get the question info? res.send({msg: `Question '${question}' with answer '${answer}' successfully deleted from database`});
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

module.exports = router;
