const express = require("express");
const db = require("../model/helper");

// this guard function checks that the question is properly structured and calculates the answer,
// then adds the answer back into the req.params for later use
// these error messages are also displayed directly in the game if a question is poorly entered
async function calculateAnswer (req, res, next ){
    const {question} = req.body;
    if (!question) {
        res.status(400).send({ msg : "Submission does not contain a valid 'question' property"})
    } else {
        try {
            //eval is a temp fix, not secure for public use.  the problem may resolve
            //itself when I have the program generate it's own equations
            const answer = eval(question);  
            req.params.answer = answer
            next()
        } catch (err){
            // console.log(err)
            res.status(400).send({msg : "malformed question cannot be calculated"})
        }
    }
        
}
}

module.exports = calculateAnswer