import {useState} from 'react'

function Bank({currentUser}) {

  return (
    <div>
        {/* would be nice to also track lifetime stars somewhere */}
        {/* {/* <div>User's ⭐: {userBalance} </div> */}
        <div className = "fs-5 text">{currentUser.userName}'s ⭐: {currentUser.balance} </div> 
        <div className = "fs-6 text">All the stars you've ever earned: {currentUser.lifetimeTotal}⭐ </div> 
    </div>
  )
}

export default Bank