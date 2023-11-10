const express = require("express");
const db = require("../model/helper");


function mustNotExist (postBodyKey, queryTableName, queryColumnName){
    // console.log("calling mustNotExist outer function (during loading?")

    const result = async function (req, res, next ) {
        // console.log("constructing instance of mustNotExist inner function (i think...) with values:")
        // console.log(postBodyKey +" " + queryTableName + " " + queryColumnName)
        // console.log(!!req.body[postBodyKey])
        if (!req.body[postBodyKey]){
            console.log("no userName property in body")
            res.status(400).send({msg: "Submission does not contain a valid 'userName' property"})
        } else {
            const searchTerm = req.body[postBodyKey];
            try {
                console.log("why does this try statement even run???")
                console.log(req.body[postBodyKey])
                const response = await db(`SELECT * FROM ${queryTableName} WHERE ${queryColumnName}="${searchTerm}"`);
                console.log(response);
                if (!response.data.length){
                    next()
                } else {
                    res.status(403).send({msg: `Action Forbidden. Table '${queryTableName}' in the database already includes an entry with '${queryColumnName} = ${searchTerm}'.  ${queryColumnName} must be unique, please try again`})
                }
            }catch (err){
                res.status(500).send(err)
            }
        }
    }
    return result
}

// function mustExist (queryParamKey, queryTableName, queryColumnName){
// return async (req, res, next ) => {
//     const searchTerm = req.params[queryParamKey];
//     try {
//         const response = await db(`SELECT * FROM ${queryTableName} WHERE ${queryColumnName}=${searchTerm}`);
//         console.log(response);
//         if (response.data.length){
//             next()
//         } else {
//             res.status(404).send({msg: "Matching entry not found in Database"})
//         }
//     }catch (err){
//         res.status(500).send(err)
//     }
// }
// }

module.exports = mustNotExist
