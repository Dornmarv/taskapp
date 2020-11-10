import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="transparent">
      <div className="container">
        <div className="nav-wrapper" style={{ paddingTop: "13px" }}>
          <Link
            to="/"
            style={{ fontWeight: "bold", color: "#162337" }}
            className="brand-logo"
          >
            <h5>Task App</h5>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
