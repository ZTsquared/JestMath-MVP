import {useState} from 'react'
import React from 'react'

function Riddle({joke}) {

    const [showPunchLine, setShowPunchLine] = useState(false)

    function handleClick () {
        setShowPunchLine(true)
    }



    return (
        <div>
            <div className = "fs-5 text">{joke.setUp}</div><br />
            <button onClick = {handleClick} className="btn btn-outline-dark">I don't know, what?</button><br /><br />
            <div className = "fs-5 text">{showPunchLine && joke.punchLine}</div>
        </div>
            
    )
}

export default Riddle