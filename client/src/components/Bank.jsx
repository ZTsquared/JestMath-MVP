import { useState } from "react";
import useAuth from "../hooks/useAuth";

function Bank() {
  const { currentUser } = useAuth();
  return (
    <div>
      <div className="fs-6 text">
        {currentUser.userName}'s ⭐: {currentUser.balance}{" "}
      </div>
      <div className="small">
        All the stars you've ever earned: {currentUser.lifetimeTotal}⭐{" "}
      </div>
    </div>
  );
}

export default Bank;
