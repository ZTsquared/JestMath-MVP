const express = require('express');
const db = require('../model/helper');
const router = express.Router();
const calculateAnswer = require("../guardFunctions/calculateAnswer")
const mustExist = require("../guardFunctions/mustExist")


// get full question list
router.get('/', async function(req, res, next) {
  try {
    const questions = await db("SELECT * FROM questions;")
    res.send(questions.data);
  }catch (err) {
    res.status(500).send(err);
  }
});


//get question by id - since i have other get routes is this :id a problem?  id can only be a number so as long are other routes are all words is this safe?
router.get('/:id', mustExist("id", "questions", "id"), async function(req, res, next) {
  console.log("getting a particular question")
  try {
    const {id} = req.params;
    const question = await db(`SELECT * FROM questions WHERE id=${id};`)
    res.send(question.data[0]);
  }catch (err) {
    res.status(500).send(err);
  }
  // res.send("nothing");
});


//get questions count - i don't think i need this after all, but it works if i need it. it's useful for a quick postman check.
router.get('/count', async function(req, res, next) {
  try {
    const questions = await db("SELECT COUNT(*) FROM questions;")
    console.log(questions.data);
    res.send(questions.data);
  }catch (err) {
    res.status(500).send(err);
  }
});


// router.get('/byID/:id', questionMustExist, async function(req, res, next) {
//   console.log("getting a particular question")
//   try {
//     const {id} = req.params;
//     const question = await db(`SELECT * FROM questions WHERE id=${id};`)
//     res.send(question.data);
//   }catch (err) {
//     res.status(500).send(err);
//   }
//   // res.send("nothing");
// });


//get 1 random question
router.get('/random/:count', async function(req, res, next) {
  const {count} = req.params;
  try {
    const question = await db(`SELECT * FROM questions ORDER BY RAND() LIMIT ${count};`)
    res.send(question.data);
  }catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', calculateAnswer, async function(req, res, next) {
  const {question} = req.body;
  const answer = req.params.answer;
  try {
    await db(`INSERT INTO questions (question, answer) values ("${question}", "${answer}");`)
    const resultObject = await db(`SELECT * FROM questions ORDER BY ID DESC LIMIT 1;`)
    resultObject.msg = `Question '${question}' with answer '${answer}' successfully added to database`
    res.send(resultObject);
    // res.send({msg: `Question '${question}' with answer '${answer}' successfully added to database`});
  } catch (err){
    res.status(500).send(err)
  }
});

router.delete('/:id', mustExist("id", "questions", "id"), async function(req, res, next) {
  const {id} = req.params;
  console.log(id)
  try {
    await db(`DELETE FROM questions WHERE id=${id};`)
    res.send({msg: `Question with id '${id}' successfully deleted from database`});
    // is there a way to send this without running a 'get' to get the question info? res.send({msg: `Question '${question}' with answer '${answer}' successfully deleted from database`});
  } catch (err){
    console.log(err)
    res.status(500).send(err)
  }
});

module.exports = router;
