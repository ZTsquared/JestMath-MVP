import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

// when making a new user if error code is 403 have the user choose a new user name. 
// this is a bit slapdash, in future there could be other reasons that you get a 403 
// (like if they submit an age that is not an integer)

function Welcome({currentUser, setCurrentUser}) {
  const [allUsers, SetAllUsers] = useState([])
  const [userNames, setUserNames] = useState([])
  const [selectedUserName, setSelectedUserName] = useState(currentUser?.userName)

  useEffect(() => {getUsers()}, [])
  useEffect(() => {setUserNames(allUsers.map(({userName}) => userName))}, [allUsers])
  useEffect(() => {if (!currentUser || (selectedUserName !== currentUser.userName)) {
    setCurrentUser(
      allUsers
      .filter(
        (e) => e.userName === selectedUserName
      )[0]);
    // console.log ("test1 start")
    // console.log (selectedUserName , currentUser?.userName)
    // console.log ("test1 end")
  }}, [selectedUserName])



  async function getUsers (){
    try {
      const resultJSON = await fetch(`api/users/`);
      const users = await resultJSON.json();
      SetAllUsers(users)
    }catch (err){
      console.log(err)
    }
  }

  function handleUserChange (e) {
    setSelectedUserName(e.target.value)
    // console.log(`setting selected user to`)
    // console.log(e.target.value)
  }


  return (    
  <div>
    <h3>Hey</h3>
    <h1>{currentUser ? currentUser.userName : "Kiddo"}</h1>
    {currentUser && <Link to="/quiz">Let's Play!</Link>}
    <br /><br /><br />
    <p>{currentUser ? "Change player" : "Who's playing?"}</p>
    <select name="userSelect" onChange={handleUserChange}>
      <option value=""></option>
      {userNames.map((userName, i) => <option key={i} value={userName}>{userName}</option>)}
    </select>
  </div>
  )
}

export default Welcome