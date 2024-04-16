import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function NotFound404() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate;

  return (
    <div>
      <div>Sorry! I can't find what you're looking for</div>
      <Link to={isLoggedIn ? "/" : "/login"}>Go to homepage</Link>
    </div>
  );
}

export default NotFound404;
