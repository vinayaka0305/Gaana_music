import React, { useRef } from "react";
import SongsSection from "./SongsSection";
import "./HomePage.css";
import TrendingSongs from "./TrendingSongs";

const HomePage = ({ list }) => {
  const songsBoxRef = useRef(null);
  const trendingSongsBoxRef = useRef(null);

  const btnPressPrev = (ref) => {
    const box = ref.current;
    const width = box.clientWidth;
    box.scrollLeft -= width;
  };

  const btnPressNext = (ref) => {
    const box = ref.current;
    const width = box.clientWidth;
    box.scrollLeft += width;
  };

  return (
    <>
      <div className="main-container">
        <div className="music-container">
          <div className="left-section">
            <div className="product-curosel">
              <h2 className="section-heading">Songs</h2>
              <button
                className="pre-btn"
                onClick={() => btnPressPrev(songsBoxRef)}
              >
                <p>&lt;</p>
              </button>
              <button
                className="next-btn"
                onClick={() => btnPressNext(songsBoxRef)}
              >
                <p>&gt;</p>
              </button>
              <div className="product-container" ref={songsBoxRef}>
                <SongsSection list={list} />
              </div>
            </div>
            <div className="product-curosel">
              <h2 className="section-heading">TrendingSongs</h2>
              <button
                className="pre-btn"
                onClick={() => btnPressPrev(trendingSongsBoxRef)}
              >
                <p>&lt;</p>
              </button>
              <button
                className="next-btn"
                onClick={() => btnPressNext(trendingSongsBoxRef)}
              >
                <p>&gt;</p>
              </button>
              <div className="product-container" ref={trendingSongsBoxRef}>
                <TrendingSongs list={list} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
