import React from 'react'
import { Link } from 'react-router-dom'
import Bank from '../components/Bank';

function Store({currentUser}) {
  return (
    <div>
        <Bank></Bank>
        <br /><br /><br />
        <div>Joke Store</div>
        <br />
        <button>Get a new joke!  10 stars</button> <br />
        <br />
        <Link to="/quiz">Earn more stars</Link>
        <br />
        <Link to="/library">UserName's Jokes</Link>
        <br /><br /><br /><br /><br />
        <Link to = "/">I'm not 'userName'!</Link>
    </div>
  )
}

export default Store