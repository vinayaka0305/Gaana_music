import React, { useRef } from "react";
import "../CSS/HomePage.css";
import "../CSS/SongsCurosel.css";
import "../CSS/AlbumCurosel.css";
import AlbumSection from "../AlbumsInHome/AlbumSection";
import TrendingSongsHome from "../TrendingSongsInHome/TrendingSongsHome";
import Footer from "../Header&Footer/Footer";


const HomePage = () => {
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
            <div className="album-product-curosel">
              <h2 className="album-section-heading">Albums</h2>
              <button
                className="album-pre-btn"
                onClick={() => btnPressPrev(songsBoxRef)}
              >
                <p>&lt;</p>
              </button>
              <button
                className="album-next-btn"
                onClick={() => btnPressNext(songsBoxRef)}
              >
                <p>&gt;</p>
              </button>
              <div className="album-product-container" ref={songsBoxRef}>
                <AlbumSection />
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
                <TrendingSongsHome />
              </div>
            </div>
          </div>
          <div className="right-section"></div>
        </div>
        <div></div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
