import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth";

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  //the current user info is stored here
  const [currentUser, setCurrentUser] = useState("");
  const [currentHouseholdName, setCurrentHouseholdName] = useState("");

  //when the page is loaded we check that the token is still valid, if it is invalid we perform an automatic logout
  useEffect(() => {
    loginCheck();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userName")) {
      // console.log(
      //   "retrieving username from local storage, retrieving user: ",
      //   localStorage.getItem("userName")
      // );
      getUser(localStorage.getItem("userName"));
    }
  }, []);

  const navigate = useNavigate();

  async function loginCheck() {
    const results = await fetch("api/auth/confirmLogin", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!results.ok) {
      onLogout();
    } else {
      const { household } = await results.json();
      setCurrentHouseholdName(household.householdName);
    }
  }

  function onLogin() {
    setIsLoggedIn(true);
    loginCheck();
    navigate("/"); //This is where to where we want the user to navigate to once they've logged IN
    // console.log("local: ", localStorage.getItem("userName"));
  }

  function onLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setCurrentUser("");
  }

  // the getUser function gets the new user data (if a userName is passed) or refreshes the current user data (if no parameter is passed).
  // it is called in most pages because user's balance the user data must be refreshed immediately or the bank account will appear out of sync.
  async function getUser(userName = currentUser.userName) {
    try {
      const resultJSON = await fetch(`api/users/${userName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const user = await resultJSON.json();
      setCurrentUser(user);
    } catch (err) {
      console.log(err);
    }
  }

  const authObject = {
    isLoggedIn,
    currentUser,
    currentHouseholdName,
    onLogin,
    onLogout,
    setCurrentUser,
    getUser,
  };

  return (
    <AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>
  );
}
