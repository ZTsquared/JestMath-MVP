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
        src={`../images/${joke.punchLine}`} // use this line instead of the one below when deploying to heroku
        // src={`../public/images/${joke.punchLine}`} // might need to use this line instead of the one above when working on localhost
        width="400"
        alt="Sorry!  This joke isn't working right now, but it's been saved in your library for later!"
      />
    </div>
  );
}

export default Comic;
