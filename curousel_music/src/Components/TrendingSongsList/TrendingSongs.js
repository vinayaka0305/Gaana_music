import React, { useState, useRef, useEffect } from "react";
import { useMusicContext } from "../../MusicContext";
import TsongPlayer from "./TsongPlayer";
import "../CSS/TsongPlayer.css";
import Footer from "../Header&Footer/Footer";

const TrendingSongs = () => {
  const { tList } = useMusicContext();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  console.log(tList);

  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (!currentSong) return; // Check if currentSong exists

    audioRef.current.pause();
    audioRef.current = new Audio(currentSong.audio_url);
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex, isPlaying, tList]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % tList.length;
    setCurrentSongIndex(nextIndex);
  };

  const playPreviousSong = () => {
    const previousIndex = (currentSongIndex - 1 + tList.length) % tList.length;
    setCurrentSongIndex(previousIndex);
  };

  const currentSong = tList[currentSongIndex];

  if (!currentSong) {
    return <div>Song Not found</div>;
  }

  const hanldePlay = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true)
  };

  return (
    <>
      <div className="tsongs-main-container">
        <div className="tsongs-container">
          <div className="tsongs-top">
            <div className="tsong-img">
              <img src={currentSong.thumbnail} alt="Song Thumbnail" />
            </div>
            <div className="tsong-names">
              <div>
                <h2 className="Tsongs-h2">Trending Songs</h2>
                <h3 className="Tsongs-h3">{currentSong.title}</h3>
                <p className="Tsongs-h3">
                  {currentSong.artist.map((item) => item.name).join(" & ")}
                </p>
              </div>
              <div>
                <button className="tPlay-btn" onClick={togglePlayPause}>
                  {isPlaying ? "Pause" : "Play"}
                </button>
              </div>
            </div>
          </div>
          <div className="tsongs-bottom">
            {tList && tList.length > 0 && (
              <div className="table-container">
                <div className="thead">
                  <div className="track-heading-container">
                    <div className="th th-heading-tracks">Tracks</div>
                  </div>
                  <div className="artist-heading-container">
                    <div className="th th-heading-tracks">Artist</div>
                  </div>{" "}
                </div>
                <div className="tbody">
                  {tList.map((obj, index) => (
                    <div className="tr" key={index}>
                      <div className="track-img" >
                       <img src={obj.thumbnail} style={{height:30,width:30}}/>
                      </div>
                      <div className="track-container">
                        <div
                          className="td Tsongs-h2"
                          onClick={() => hanldePlay(index)}
                        >
                          {obj.title}
                        </div>
                      </div>
                      <div className="artist-container">
                        <div className="td Tsongs-h3">
                          {obj.artist.map((item) => item.name).join(" & ")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
      <TsongPlayer
        title={currentSong.title}
        thumbnail={currentSong.thumbnail}
        url={currentSong.audio_url}
        playNextSong={playNextSong}
        playPreviousSong={playPreviousSong}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        audioRef={audioRef}
      />
    </>
  );
};

export default TrendingSongs;
