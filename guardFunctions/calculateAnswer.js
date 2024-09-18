const express = require("express");
const db = require("../model/helper");

// this guard function checks that the question is properly structured and calculates the answer,
// then adds the answer back into the req.params for later use, and also does some formating of the question for display purposes
// these error messages are also displayed directly in the game if a question is poorly entered
async function calculateAnswer(req, res, next) {
  const { question } = req.body;
  let customError = "";
  if (!question) {
    return res
      .status(400)
      .send({ msg: "Submission does not contain a valid 'question' property" });
  }
  try {
    //strip the question to the valid characters. the stripping of characters is redundant becasue I already test for them, before running eval I want to be sure to toss out or disrupt any funky strings.
    const stripped = question.replace(/[^\d.+\-*()/]/g, "");
    const regexPattern = new RegExp(`[^\\d.+\\-*()/\\s]`);
    if (
      regexPattern.test(question) ||
      stripped.length > 20 ||
      !/[+\-*/]/.test(stripped.slice(1))
    ) {
      customError =
        "Question must be an equation with a maximum length of 20 characters and containing only digits and the characters ( ) . + - * and /.";
      throw new Error();
    }
    if (stripped.includes("**")) {
      throw new Error();
    }
    const answer = eval(stripped);
    const decPlaces = answer.toString().includes(".")
      ? answer.toString().length - 1 - answer.toString().indexOf(".")
      : 0;
    if (stripped === answer.toString() || decPlaces > 2 || answer > 10000) {
      console.log("error2");
      customError =
        "The result cannot exceed 10000 or have more than 2 decimal places.";
      throw new Error();
    }
    let formatted = stripped.replace(/[+\-*()/]/g, " $& ").trimStart();
    req.params.answer = answer;
    req.body.question = formatted;
    next();
  } catch (err) {
    // console.log(err)
    res.status(400).send({
      msg:
        customError ||
        "Upload failed: Malformed question cannot be calculated.",
    });
  }
}

module.exports = calculateAnswer;
