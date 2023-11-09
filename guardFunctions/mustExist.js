const express = require("express");
const db = require("../model/helper");


function mustExist (queryParamKey, queryTableName, queryColumnName){
    // this works but i don't really understand it becasue i am returning a function.
    // and now my outer function is not async but my inner function is and that seems ok?

    const result = async function (req, res, next ) {
        const searchTerm = req.params[queryParamKey];
        try {
            const response = await db(`SELECT * FROM ${queryTableName} WHERE ${queryColumnName}="${searchTerm}"`);
            console.log(response);
            if (response.data.length){
                next()
            } else {
                res.status(404).send({msg: `Searching database table '${queryTableName}' for entry '${queryColumnName} = ${searchTerm}' produced no results`})
            }
        }catch (err){
            res.status(500).send(err)
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

module.exports = mustExist
