import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth";

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const navigate = useNavigate();

  function onLogin() {
    setIsLoggedIn(true);
    navigate("/"); //This is where to where we want the user to navigate to once they've logged IN
  }

  function onLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  }

  const authObject = {
    isLoggedIn,
    onLogin,
    onLogout,
  };

  return (
    <AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>
  );
}
