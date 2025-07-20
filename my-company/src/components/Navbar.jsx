import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
  return (
    <nav style={{ backgroundColor: "aqua", padding: "1rem" }}>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "1rem",
          textDecoration: "none",
          justifyContent: "center",
        }}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/services">Service</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
