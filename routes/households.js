const express = require("express");
const router = express.Router();
const models = require("../models");
// const { Op, Association } = require("sequelize");
const mustExist = require("../guardFunctions/mustExist");
const mustNotExist = require("../guardFunctions/mustNotExist");
const householdShouldBeLoggedIn = require("../guardFunctions/householdShouldBeLoggedIn");

//for posting a household or posting a login event see register route in auth file
