const express = require("express");
const db = require("../model/helper");


async function questionMustExist (req, res, next ){
    const {id} = req.params;
    try {
        const response = await db(`SELECT * FROM questions WHERE id=${id}`);
        console.log(response);
        if (response.data.length){
            next()
        } else {
            res.status(404).send({msg: "Question not found"})
        }
    }catch (err){
        res.status(500).send(err)
    }
}

module.exports = questionMustExist