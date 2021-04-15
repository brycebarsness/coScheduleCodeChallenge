import React from "react";
import "./Footer.css";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <footer>
      Bryce Barsness | website: bryce.mn | email: brycebarsness5@gmail.com | or
      find me on LinkedIn{" "}
    </footer>
  );
}

export default Footer;
