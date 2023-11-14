import React from 'react'
import { Link } from 'react-router-dom'
import Bank from '../components/Bank';

//I still need to fetch user's jokes based on the junctiontable userJokes

function Library({currentUser}) {
  return (
    <div>
        <Bank currentUser = {currentUser} />
        <br /><br /><br />
        <div>UserName's Jokes</div>
        <br />
        {/* Here I need to Map through user's jokes and display them appropriately to their format */}
        <br /><br />
        <Link to="/quiz">Earn more stars</Link>
        <br />
        <Link to="/store">Get more jokes</Link>
        <br /><br /><br /><br /><br />
        <Link to = "/">{currentUser ? `I'm not ${currentUser.userName}!` : "Login"}</Link>
    </div>
    
  )
}

export default Library