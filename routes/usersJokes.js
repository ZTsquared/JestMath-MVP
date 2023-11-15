var express = require('express');
var router = express.Router();
const db = require('../model/helper')
const mustExist = require("../guardFunctions/mustExist");



//add a joke to a user's personal library
// ideally later i will add the mustExist guard function twice here, to check that the user exista and the joke exists.
router.post('/', async function(req, res, next) {
  if (!req.body.user_id || !req.body.joke_id){
    res.status(422).send({msg: "Submission does not contain valid data"})
  } else {
    try {
      const {user_id, joke_id} = req.body;
      await db(`INSERT INTO usersJokes (user_id, joke_id) values (${user_id}, ${joke_id});`)
      res.send({msg: `Joke_${joke_id} successfully added to user_${user_id}'s library`});
    } catch (err){
      res.status(500).send(err)
    }  
  }
});




module.exports = router;


