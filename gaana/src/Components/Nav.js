import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Nav.css";
function Nav({onFilterSelection}) {
  return (
    <div className="nav-container">
      <Link to="/" className="nav-link">
        All
      </Link>
      <Link to="/TrendingSongs" className="nav-link" onClick={()=>onFilterSelection("Trending songs")}>
        TrendingSongs
      </Link>
      <Link to="/Top_20" className="nav-link">
        Top 20 of this week
      </Link>
      <Link to="/" className="nav-link">
        Album
      </Link>
    </div>
  );
}

export default Nav;
