import { useState } from "react";

import React from "react";

function Comic({ joke }) {
  const title = joke.setUp.split("/")[0];
  const artist = joke.setUp.split("/")[1];

  return (
    <div>
      <h4>{title}</h4>
      <h6>{artist}</h6>
      <img
        src={`../public/images/${joke.punchLine}`}
        width="400"
        alt="NEW COMIC"
      />
    </div>
  );
}

export default Comic;
