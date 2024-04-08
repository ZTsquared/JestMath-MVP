import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Quiz from "./pages/Quiz";
import Store from "./pages/Store";
import Library from "./pages/Library";
import ParentPortal from "./pages/ParentPortal";

function App() {
  //the current user info is stored here and passed to all the other pages as a prop
  // const [selectedIDinParent, setSelectedIDinParent] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    console.log(
      `the current user in App file is now: ${currentUser?.userName}`
    );
    console.log(currentUser);
  }, [currentUser]);

  // the getUser function gets the new user data (if a userName is passed) or refreshes the current user data (if no parameter is passed).
  // it is passed as a prop to some of the other pages since any time a change is made to the
  // user's balance the user data must be refreshed immediately or the bank account will appear out of sync.
  async function getUser(userName = currentUser.userName) {
    try {
      console.log("trying to refresh user for userName");
      console.log(userName + ` at path:  api/users/${userName}`);
      const resultJSON = await fetch(`api/users/${userName}`);
      const user = await resultJSON.json();
      setCurrentUser(user);
    } catch (err) {
      console.log(err);
    }
  }

  // the handleUserChange function was passed as a prop to the login page and called when someone logs in.
  // FIXME: i don't think it's needed anymore, try deleting it
  // function handleUserChange(selectedUser) {
  //   setCurrentUser(selectedUser);
  // }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Welcome
              currentUser={currentUser}
              getUser={(userName) => getUser(userName)}
              // setCurrentUser={(selectedUser) => handleUserChange(selectedUser)}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Login
              currentUser={currentUser}
              getUser={(userName) => getUser(userName)}
              // setCurrentUser={(selectedUser) => handleUserChange(selectedUser)}
            />
          }
        ></Route>
        <Route
          path="/quiz"
          element={<Quiz currentUser={currentUser} getUser={getUser} />}
        ></Route>
        <Route
          path="/store"
          element={<Store currentUser={currentUser} getUser={getUser} />}
        ></Route>
        <Route
          path="/library"
          element={<Library currentUser={currentUser} getUser={getUser} />}
        ></Route>
        <Route
          path="/parentPortal"
          element={<ParentPortal currentUser={currentUser} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
