import "../App.css";
import React from "react";
import RightSection from "./RightSection";
import Songs from "./Songs";
import TrendingSongs from "./TrendingSongs";
import "./CSS/songs-section.css";

function HomePage({list}) {
  return (
    <div>
      <div className="main-container">
        <div className="music-container">
          <div className="left-section">
            <Songs list={list} />
            <TrendingSongs list={list}/>
          </div>
          <div className="right-section">
            <RightSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
