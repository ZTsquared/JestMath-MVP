import { useState, useEffect } from "react";

import React from "react";
// import { use } from "../../../routes";

function Comic({ joke, setOfferNewJoke }) {
  const title = joke.setUp.split("/")[0];
  const artist = joke.setUp.split("/")[1];

  useEffect(() => {
    setTimeout(() => {
      setOfferNewJoke(true);
    }, 2000);
  }, []);

  return (
    <div>
      <h4>{title}</h4>
      <h6>{artist}</h6>
      <img
        src={`../public/images/${joke.punchLine}`}
        width="400"
        alt="Sorry!  This joke isn't working. I've refunded your stars so you can try again"
      />
    </div>
  );
}

export default Comic;
