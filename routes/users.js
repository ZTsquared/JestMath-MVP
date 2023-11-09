var express = require('express');
var router = express.Router();
const db = require('../model/helper')
const mustExist = require("../guardFunctions/mustExist");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const resultsObject = await db("SELECT * FROM users;")
    const users = resultsObject.data;
    res.send(users);
  }catch(err) {
    res.status(500).send(err);
  }
});

router.get('/byUserName/:userName', mustExist("userName", "users", "userName"), async function(req, res, next) {
  console.log("getting a particular user")
  try {
    const {userName} = req.params;
    const user = await db(`SELECT * FROM users WHERE userName= "${userName}";`)
    res.send(user.data);
  }catch (err) {
    res.status(500).send(err);
  }
  // res.send("nothing");
});


//disallow dupicate user names in the post method using a guard function, 
//if household or primary account column is enabled later that function can 
//change to make sure there are no duplicates within the household instead of within the database,
//and the get user by id function can become get by userName become by userName-household

module.exports = router;
