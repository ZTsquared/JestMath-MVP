var express = require('express');
var router = express.Router();
const db = require('../model/helper')
const mustExist = require("../guardFunctions/mustExist");
const mustNotExist = require("../guardFunctions/mustNotExist");

// get full jokes list
router.get('/', async function(req, res, next) {
    try {
      const jokes = await db("SELECT * FROM jokes;")
      res.send(jokes.data);
    }catch (err) {
      res.status(500).send(err);
    }
  });

  
//get joke by id
router.get('/:id', mustExist("id", "jokes", "id"), async function(req, res, next) {
// console.log("getting a particular joke")
try {
    const {id} = req.params;
    const joke = await db(`SELECT * FROM jokes WHERE id=${id};`)
    res.send(joke.data[0]);
}catch (err) {
    res.status(500).send(err);
}
});


router.post('/', async function(req, res, next) {
    const allowableTypes = ["knockknock", "riddle"]    
    if (!req.body.setUp || !req.body.punchLine || !req.body.jokeType ){
      res.status(400).send({msg: "Submission does not contain required properties"})
    } else if (!allowableTypes.includes(req.body.jokeType.toLowerCase().replaceAll(" ",""))){
        res.status(400).send({msg: `Only joke types ${allowableTypes} can be entered`})
    } else {
        let {setUp, punchLine, jokeType} = req.body;
        jokeType = jokeType.toLowerCase().replaceAll(" ","")
        try {
          await db(`INSERT INTO jokes (setUp, punchLine, jokeType) values ("${setUp}", "${punchLine}", "${jokeType}");`)
          // res.send({msg: `'${jokeType}' type joke successfully added to database`});
          const resultObject = await db(`SELECT * FROM jokes ORDER BY ID DESC LIMIT 1;`)
          resultObject.msg = `'${jokeType}' type joke successfully added to database`
          res.send(resultObject);
        } catch (err){
          res.status(500).send(err)
        }  
    }
  });


module.exports = router;