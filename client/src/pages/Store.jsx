import React from 'react'
import { Link } from 'react-router-dom'
import Bank from '../components/Bank';

function Store({currentUser}) {
  return (
    <div>
        <Bank currentUser = {currentUser}/>
        <br /><br /><br />
        <div>Joke Store</div>
        <br />
        <button>Get a new joke!  10 stars</button> <br />
        <br />
        <Link to="/quiz">Earn more stars</Link>
        <br />
        <Link to="/library">UserName's Jokes</Link>
        <br /><br /><br /><br /><br />
        <Link to = "/">{currentUser ? `I'm not ${currentUser.userName}!` : "Login"}</Link>
    </div>
  )
}

export default Store