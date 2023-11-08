const express = require('express');
const db = require('../model/helper');
const router = express.Router();
const questionMustExist = require("../guardFunctions/questionMustExist");
const calculateAnswer = require("../guardFunctions/calculateAnswer")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index', { title: 'Express' });
});


// // get full question list
// router.get('/questions', async function(req, res, next) {
//   try {
//     const questions = await db("SELECT * FROM questions;")
//     res.send(questions.data);
//   }catch (err) {
//     res.status(500).send(err);
//   }
// });

// //get questions count - i don't think i need this after all, but it works if i need it. it's useful for a quick postman check.
// router.get('/questions/count', async function(req, res, next) {
//   try {
//     const questions = await db("SELECT COUNT(*) FROM questions;")
//     console.log(questions.data);
//     res.send(questions.data);
//   }catch (err) {
//     res.status(500).send(err);
//   }
// });

// //get question by id
// router.get('/questions/byID/:id', questionMustExist, async function(req, res, next) {
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

// //get 1 random question
// router.get('/questions/random/:count', async function(req, res, next) {
//   const {count} = req.params;
//   try {
//     const question = await db(`SELECT * FROM questions ORDER BY RAND() LIMIT ${count};`)
//     res.send(question.data);
//   }catch (err) {
//     res.status(500).send(err);
//   }
// });

// router.post('/questions', calculateAnswer, async function(req, res, next) {
//   console.log("---------------!!!!!-----------------")
//   console.log("---------------!!!!!-----------------")
//   console.log(req.body)
//   const {question} = req.body;
//   //eval is a temp fix, not secure for public use.  the problem may resolve
//   //itself when I have the program generate it's own equations
//   console.log(question);
//   const answer = eval(question);
//   console.log(answer);
//   console.log("---------------!!!!!-----------------")
//   console.log("---------------!!!!!-----------------")

//   try {
//     await db(`INSERT INTO questions (question, answer) values ("${question}", "${answer}");`)
//     res.send({msg: `Question '${question}' with answer '${answer}' successfully added to database`});
//   } catch (err){
//     res.status(500).send(err)
//   }
// });

// router.delete('/questions/:id', questionMustExist, async function(req, res, next) {
//   const {id} = req.params;
//   console.log(id)
//   try {
//     await db(`DELETE FROM questions WHERE id=${id};`)
//     res.send({msg: `Question with id '${id}' successfully deleted from database`});
//     // res.send({msg: `Question '${question}' with answer '${answer}' successfully deleted from database`});
//   } catch (err){
//     console.log(err)
//     res.status(500).send(err)
//   }
// });

module.exports = router;
