const express = require('express');
const db = require('../model/helper');
const router = express.Router();
const calculateAnswer = require("../guardFunctions/calculateAnswer")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index', { title: 'Express' });
});




module.exports = router;
