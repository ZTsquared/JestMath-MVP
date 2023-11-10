var express = require('express');
var router = express.Router();
const db = require('../model/helper')
const mustExist = require("../guardFunctions/mustExist");
const mustNotExist = require("../guardFunctions/mustNotExist");

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

router.get('/:userName', mustExist("userName", "users", "userName"), async function(req, res, next) {
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


// i don't need these get routes.  i just get the whole user and then pull out the parameter.
// OR will i need to do something like set the starting state based on the current user but then get and set that independant value dynamically so that it stays up to date?

// router.get('/:userName/balance', mustExist("userName", "users", "userName"), async function(req, res, next) {
//   console.log("getting user balance")
//   try {
//     const {userName} = req.params;
//     const balance = await db(`SELECT balance FROM users WHERE userName = "${userName}";`)
//     res.send(balance.data);
//   }catch (err) {
//     res.status(500).send(err);
//   }
//   // res.send("nothing");
// });

// router.get('/:userName/lifetimeTotal', mustExist("userName", "users", "userName"), async function(req, res, next) {
//   console.log("getting user lifetime total")
//   try {
//     const {userName} = req.params;
//     const lifetimeTotal = await db(`SELECT lifetimeTotal FROM users WHERE userName= "${userName}";`)
//     res.send(lifetimeTotal.data);
//   }catch (err) {
//     res.status(500).send(err);
//   }
//   // res.send("nothing");
// });



router.post('/',  mustNotExist("userName", "users", "userName"), async function(req, res, next) {
  console.log(!req.body.userName || !req.body.userName)
  if (!req.body.userName || !req.body.userAge){
    res.status(400).send({msg: "Submission does not contain a valid 'userName' and / or 'userAge' properties"})
  }
  const {userName, userAge} = req.body;
  try {
    await db(`INSERT INTO users (userName, userAge) values ("${userName}", ${userAge});`)
    res.send({msg: `User '${userName}' with age '${userAge}' successfully added to database`});
  } catch (err){
    res.status(500).send(err)
  }  
});

// router.post('/',  mustNotExist("userName", "users", "userName"), async function(req, res, next) {
//   let userName = null
//   let userAge = null
//   if (req.body.userName && req.body.userName){
//     userName = req.body.userName;
//     userAge = req.body.userAge;
//   } else {
//     res.status(400).send({msg: "Submission does not contain a valid 'userName' property"})
//   }
//   try {
//     await db(`INSERT INTO users (userName, userAge) values ("${userName}", ${userAge});`)
//     res.send({msg: `User '${userName}' with age '${userAge}' successfully added to database`});
//   } catch (err){
//     res.status(500).send(err)
//   }
// });

// later - household groupings, ability to change userName, ability to merge stars and jokes from one account into another if you delete the first, 


router.put('/:userName/increaseBalance/',  mustExist("userName", "users", "userName"), async function(req, res, next) {
  console.log("put")
  console.log(isNaN(+req.body.quantity))
  if (!req.body.quantity || !req.params.userName){
    console.log("if")
    res.status(422).send({msg: "Submission does not contain valid data"})
  } else if (typeof +req.body.quantity === NaN){
    console.log("else if")
    res.status(422).send({msg: "Amount of desired increase must be a number (data type number"})
  } else {
    try {
      console.log("else")
      const {userName} = req.params;
      const {quantity} = req.body;
      await db(`UPDATE users SET balance = balance+${quantity} WHERE userName = "${userName}";`)
      res.send({msg: `User '${userName}' balance increased by ${quantity}`});
    } catch (err){
      res.status(500).send(err)
    }  
  }
});

router.put('/:userName/increaseLifetimeTotal/',  mustExist("userName", "users", "userName"), async function(req, res, next) {
  if (!req.body.quantity || !req.params.userName){
    res.status(422).send({msg: "Submission does not contain valid data"})
  } else if (isNaN(+req.body.quantity)){
    res.status(422).send({msg: "Amount of desired increase must be an number (data type number"})
  } else {
    try {
      const {userName} = req.params;
      const {quantity} = req.body;
      await db(`UPDATE users SET lifetimeTotal = lifetimeTotal+${quantity} WHERE userName = "${userName}";`)
      res.send({msg: `User '${userName}' lifetimeTotal increased by ${quantity}`});
    } catch (err){
      res.status(500).send(err)
    }  
  }
});


router.delete('/:userName', mustExist("userName", "users", "userName"), async function(req, res, next) {
  try {
    const {userName} = req.params;
    await db(`DELETE FROM users WHERE userName="${userName}";`)
    res.send({msg: `User with userName '${userName}' successfully deleted from database`});
  } catch (err){
    console.log(err)
    res.status(500).send(err)
  }
});


//disallow dupicate user names in the post method using a guard function, 
//if household or primary account column is enabled later that function can 
//change to make sure there are no duplicates within the household instead of within the database,
//and the get user by id function can become get by userName become by userName-household

module.exports = router;


