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

// at the moment i don't use :id or /count but i built them so i'll leave them here for later
router.get('/:id', mustExist("id", "questions", "id"), async function(req, res, next) {
  console.log("getting a particular question")
  try {
    const {id} = req.params;
    //  this if clause checks whether the param you passed in this position is a number
    //  if it is it processes it as an id, if it is not it allows the router to move on to try other routes (like /count)
    if (isNaN(+id)){
      next()
    } else {
      const question = await db(`SELECT * FROM questions WHERE id=${id};`)
      res.send(question.data[0]);
    }
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


// //get question by id, I also don't think I actually need this route but it's here. 
// //I think there is a bug in it at the moment but i can't be bothered to fix it becasue I don't need the route yet...
// router.get('/byID/:id', questionMustExist, async function(req, res, next) {
//   console.log("getting a particular question")
//   try {
//     const {id} = req.params;
//     const question = await db(`SELECT * FROM questions WHERE id=${id};`)
//     res.send(question.data);
//   }catch (err) {
//     res.status(500).send(err);
//   }
// });


//get a specified number of random questions
router.get('/random/:count', async function(req, res, next) {
  const {count} = req.params;
  try {
    const question = await db(`SELECT * FROM questions ORDER BY RAND() LIMIT ${count};`)
    res.send(question.data);
  }catch (err) {
    res.status(500).send(err);
  }
});


// post a question.  Must post the question in syntax that javascript can evaluate and calculate an answer for
// otherwise the calculate answer guard function will reject it
router.post('/', calculateAnswer, async function(req, res, next) {
  const {question} = req.body;
  const answer = req.params.answer;
  try {
    // post:
    await db(`INSERT INTO questions (question, answer) values ("${question}", "${answer}");`)
    // get the new question object back (i may not need this but i am toying with showing it on the screen after you post it):
    const resultObject = await db(`SELECT * FROM questions ORDER BY ID DESC LIMIT 1;`)
    // add a message to the body of the result for future use - currently I show the user this message.
    resultObject.msg = `Question '${question}' with answer '${answer}' successfully added to database`
    res.send(resultObject);
  } catch (err){
    res.status(500).send(err)
  }
});


// delete a question.  so far I don't use this but in future i would like to make it possible the parent to curate the questions
router.delete('/:id', mustExist("id", "questions", "id"), async function(req, res, next) {
  const {id} = req.params;
  if (isNaN(+id)){
    next()
  }
  try {
    await db(`DELETE FROM questions WHERE id=${id};`)
    res.send({msg: `Question with id '${id}' successfully deleted from database`});
    // is there a way to send the following without running a 'get' to get the question info? res.send({msg: `Question '${question}' with answer '${answer}' successfully deleted from database`});
  } catch (err){
    console.log(err)
    res.status(500).send(err)
  }
});

module.exports = router;
