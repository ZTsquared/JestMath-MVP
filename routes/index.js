const express = require("express");
const db = require("../model/helper");
const router = express.Router();
const calculateAnswer = require("../guardFunctions/calculateAnswer");

/* GET home page. */
router.get("/", function (req, res, next) {
  // i don't understand this line.  it returns an error in postman, i think becasue it is not a single object?
  // does it do something important?
  res.send("index", { title: "Express" });
});

module.exports = router;

/* GET test. */
router.get("/", function (req, res, next) {
  // i don't understand this line.  it returns an error in postman, i think becasue it is not a single object?
  // does it do something important?
  res.send({ message: "Express" });
});
