import {useState, useEffect} from 'react'
import React from 'react'

function Riddle({joke}) {

    const [showPunchLine, setShowPunchLine] = useState(false)
    const prefixes = ["who", "what", "when", "where", "why", "how"]

    useEffect((() => {constructResponse()}), [showPunchLine])



    function handleClick () {
        setShowPunchLine(true)
    }

    function constructResponse () {
        const firstWord = joke.setUp.split(" ")[0].split("'")[0].split("´")[0].toLowerCase();
        let responseLine = "I don't know, "
        if (prefixes.includes(firstWord)){
            responseLine += firstWord;
            responseLine += "?";
        } else {
            responseLine += "tell me";
        }
        return responseLine
    }


    return (
        <div>
            <div className = "fs-5 text">{joke.setUp}</div><br />
            {/* i want to add a selector where if the first word in the setUp is What the response is "I don't know, what?"  if it's why, then "I don't know, why?" etc for who, when, where, how - and if anything else, "I don't know, tell me?" */}
            <button onClick = {handleClick} className="btn btn-outline-dark">{constructResponse()}</button><br /><br />
            <div className = "fs-5 text">{showPunchLine && joke.punchLine}</div>
        </div>
            
    )
}

export default Riddle