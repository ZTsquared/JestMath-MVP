import {useState} from 'react'

function Bank({currentUser}) {

  return (
    <div>
        {/* would be nice to also track lifetime stars somewhere */}
        {/* {/* <div>User's ⭐: {userBalance} </div> */}
        <div>User's ⭐: {currentUser.balance} </div> 
    </div>
  )
}

export default Bank