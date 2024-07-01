import { Navigate } from "react-router-dom";

export default function RequireCurrentUser({ children }) {
  // redirect you if you're not logged in
  if (!localStorage.getItem("userName")) {
    return <Navigate to="/" />;
  }
  // otherwise, let you through
  return children;
}
