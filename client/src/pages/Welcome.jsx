import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// when making a new user if error code is 403 have the user choose a new user name.
// this is a bit slapdash, in future there could be other reasons that you get a 403
// (like if they submit an age that is not an integer)

function Welcome({ currentUser, getUser }) {
  // const { isLoggedIn, onLogin } = useAuth();
  const [allUsers, SetAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(currentUser?.id);
  const navigate = useNavigate();

  // below: gets all the users on page reload:
  //FIXME: currently broken when not logged in. redirect to login screen
  useEffect(() => {
    //if logged in, ie if local storage contains a valid token
    getUsers();
    //else navigate to login page
  }, []);

  // below: updates/refreshes the currentUser information.  The if statement is there because otherwise the
  // value binding between selectedUser and the user selector drop down was causing the user to be
  // logged out whenever you navigated to the welcome page. FIXME: first if statement may not be necessary anymore now that the userName is in local storage
  useEffect(() => {
    if (!currentUser || selectedUserId !== currentUser.id) {
      const selectedUser = allUsers.filter((e) => e.id === +selectedUserId)[0];
      // setCurrentUser(selectedUser);
      if (selectedUser) {
        getUser(selectedUser.userName);
        localStorage.setItem("userName", selectedUser.userName);
      }
    }
  }, [selectedUserId]);

  async function getUsers() {
    try {
      const resultJSON = await fetch(`api/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (resultJSON.ok) {
        const users = await resultJSON.json();
        SetAllUsers(users);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }

  function handleUserChange(e) {
    setSelectedUserId(e.target.value);
  }

  return (
    <div>
      <h3>Hey</h3>
      <h1>{currentUser ? currentUser.userName : "Kiddo"}</h1> <br />
      <br />
      {currentUser && <Link to="/quiz">Let's Play!</Link>}
      <br />
      <br />
      <br />
      <p>{currentUser ? "Change player" : "Who's playing?"}</p>
      <select name="userSelect" onChange={handleUserChange}>
        <option value=""></option>
        {/* {userNames.map((userName, i) => <option key={i} value={userName}>{userName}</option>)} */}
        {allUsers.map((user, i) => (
          <option key={i} value={user.id}>
            {user.userName}
          </option>
        ))}
      </select>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Link to="/parentPortal">Parent Portal</Link>
    </div>
  );
}

export default Welcome;
