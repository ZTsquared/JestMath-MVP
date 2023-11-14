import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

// when making a new user if error code is 403 have the user choose a new user name. 
// this is a bit slapdash, in future there could be other reasons that you get a 403 
// (like if they submit an age that is not an integer)

function Welcome({currentUser, setCurrentUser}) {
  const [allUsers, SetAllUsers] = useState([])
  const [userNames, setUserNames] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(currentUser?.id)

  // below: gets all the users or page reload:
  useEffect(() => {getUsers()}, [])
  // below:  sets the list of usernames any time the allUsers list changes
  useEffect(() => {setUserNames(allUsers.map(({userName}) => userName))}, [allUsers])
  // below: updates/refreshes the currentUser information.  The if statement is there becasue otherwise the 
  // value binding between selectedUser and the user selector drop down was causing the user to be
  // logged out whenever you navigated to the welcome page. 
  useEffect(() => {if (!currentUser || (selectedUserId !== currentUser.id)) {
    setCurrentUser(
      allUsers
      .filter(
        (e) => e.id === +selectedUserId
      )[0]);
  }}, [selectedUserId])



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
    console.log("handleUserChange")
    setSelectedUserId(e.target.value)
  }


  return (    
  <div>
    <h3>Hey</h3>
    <h1>{currentUser ? currentUser.userName : "Kiddo"}</h1> <br /><br />
    {currentUser && <Link to="/quiz">Let's Play!</Link>}
    <br /><br /><br />
    <p>{currentUser ? "Change player" : "Who's playing?"}</p>
    <select name="userSelect" onChange={handleUserChange}>
      <option value=""></option>
      {/* {userNames.map((userName, i) => <option key={i} value={userName}>{userName}</option>)} */}
      {allUsers.map((user, i) => <option key={i} value={user.id}>{user.userName}</option>)} 
    </select>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <Link to="/parentPortal">Parent Portal</Link>

  </div>
  )
}

export default Welcome