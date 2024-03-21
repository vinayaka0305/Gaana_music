import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Nav.css";

function Nav() {
  return (
    <div className="nav-container">
      <div className="nav-link-cnt">
        <Link to="/" className="nav-link">
          All
        </Link>
        <Link to="/TrendingSongs" className="nav-link">
          TrendingSongs
        </Link>
        <Link to="/Top_20" className="nav-link">
          Top 20 of this week
        </Link>
        <Link to="/Album" className="nav-link">
          Album
        </Link>
      </div>
    </div>
  );
}

export default Nav;
