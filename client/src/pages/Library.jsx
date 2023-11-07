import React from 'react'
import { Link } from 'react-router-dom'
import Bank from '../components/Bank';

function Library() {
  return (
    <div>
        <Bank></Bank>
        <br /><br /><br />
        <div>UserName's Jokes</div>
        <br />
        <Link to="/quiz">Earn more stars</Link>
        <br />
        <Link to="/store">Get more jokes</Link>
        <br /><br /><br /><br /><br />
        <Link to = "/">I'm not 'userName'!</Link>
    </div>
    
  )
}

export default Library