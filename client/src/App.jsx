import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Quiz from "./pages/Quiz";
import Store from "./pages/Store";
import Library from "./pages/Library";
import ParentPortal from "./pages/ParentPortal";

function App() {
  //the current user info is stored here and passed to all the other pages as a prop
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    console.log(
      `the current user in App file is now: ${currentUser?.userName}`
    );
  }, [currentUser]);

  // the getUser function gets the new user data or refreshes the current user data.
  // it is passed as a prop to some of the other pages since any time a change is made to the
  // user's balance the user data must be refreshed imediately or the bank account will appear out of sync.
  async function getUser() {
    try {
      console.log("trying to refresh user for userName");
      console.log(
        currentUser.userName + ` at path:  api/users/${currentUser.userName}`
      );
      const resultJSON = await fetch(`api/users/${currentUser.userName}`);
      const user = await resultJSON.json();
      setCurrentUser(user);
    } catch (err) {
      console.log(err);
    }
  }

  // the handleUserChange function is passed as a prop to the login page and called when someone logs in.
  function handleUserChange(selectedUser) {
    setCurrentUser(selectedUser);
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Welcome
              currentUser={currentUser}
              setCurrentUser={(selectedUser) => handleUserChange(selectedUser)}
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
          element={<Library currentUser={currentUser} />}
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
