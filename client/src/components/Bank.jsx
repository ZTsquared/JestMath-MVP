import {useState} from 'react'

function Bank({currentUser}) {

  return (
    <div>
        <div className = "fs-6 text">{currentUser.userName}'s ⭐: {currentUser.balance} </div> 
        <div className = "small" >All the stars you've ever earned: {currentUser.lifetimeTotal}⭐ </div> 
    </div>
  )
}

export default Bank