const express = require("express");
const db = require("../model/helper");

async function calculateAnswer (req, res, next ){
    // console.log("---------------!!!!!-----------------")
    // console.log("---------------!!!!!-----------------")
    // console.log(req.body)
    const {question} = req.body;
    // console.log(question);
    // console.log(!question);
    if (!question) {
        res.status(400).send({ msg : "Submission does not contain a valid 'question' property"})
    } else {
        try {
            //eval is a temp fix, not secure for public use.  the problem may resolve
            //itself when I have the program generate it's own equations
            const answer = eval(question);  
            req.params.answer = answer
            // console.log(answer);
            // console.log("---------------!!!!!-----------------")
            // console.log("---------------!!!!!-----------------")
            next()
        } catch (err){
            // console.log(err)
            res.status(400).send({msg : "malformed question cannot be calculated"})
        }
    }
        
}

module.exports = calculateAnswer