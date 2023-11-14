import {useState} from 'react'


function KnockKnock({joke}) {
    
    const [showSetUp, setShowSetUp] = useState(false)
    const [showPunchLine, setShowPunchLine] = useState(false)

    function handleClick (e) {
        if (e.target.id === "Who's there?") {
            setShowSetUp(true)
        }
        else {
        setShowPunchLine(true)
        }
    }



    return (
        <div>
            <div className = "fs-5 text">Knock Knock!</div><br />
            <button id = "Who's there?" onClick = {handleClick} className="btn btn-outline-dark">Who's there?</button><br /><br />
            {showSetUp && 
            <div>
                <div className = "fs-5 text">{showSetUp && joke.setUp}</div><br />
                <button onClick = {handleClick} className="btn btn-outline-dark">{joke.setUp} who?</button>
                <br /><br />
            </div>}
            <div className = "fs-5 text">{showPunchLine && joke.punchLine}</div><br />
        </div>
            
    )
}

export default KnockKnock