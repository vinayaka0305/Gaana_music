import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUser } from "../UseProvider";
import TsongPlayer from "./TsongPlayer";
import "./CSS/MyMusic.css";
import "./CSS/TsongPlayer.css";
import Footer from "./Footer";

const MyMusic = () => {
  const { getToken } = useUser();
  const [list, setList] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
  }, [currentSongIndex]);

  useEffect(() => {
    listOfLibrary();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const playNextSong = () => {
    const newIndex = (currentSongIndex + 1) % list.length;
    setCurrentSongIndex(newIndex);
  };

  const playPreviousSong = () => {
    const newIndex = (currentSongIndex - 1 + list.length) % list.length;
    setCurrentSongIndex(newIndex);
  };

  const listOfLibrary = () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/favorites/like", {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((result) => {
        setList(result.data.data.songs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (songId) => {
    axios
      .patch(
        "https://academics.newtonschool.co/api/v1/music/favorites/like",
        { songId: songId },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((result) => {
        listOfLibrary();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handlePlay = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const currentSong = list[currentSongIndex];

  if (!currentSong) {
    return <div>No songs found</div>;
  }

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
                <h2 className="Tsongs-h2">My music</h2>
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
            {list && list.length > 0 ? (
              <div className="table-container">
                <div className="thead">
                  <div className="track-heading-container">
                    <div className="th th-heading-tracks">Tracks</div>
                  </div>
                  <div className="artist-heading-container"></div>
                </div>
                <div className="tbody">
                  {list.map((obj, index) => (
                    <div className="tr" key={index}>
                      <div>
                        <img
                          src={obj.thumbnail}
                          style={{ height: 30, width: 30 }}
                          alt="Thumbnail"
                        />
                      </div>
                      <div className="track-container">
                        <div
                          className="td Tsongs-h2"
                          onClick={() => handlePlay(index)}
                        >
                          {obj.title}
                        </div>
                      </div>
                      <div className="artist-container">
                        <div className="td Tsongs-h3">
                          <i
                            className="fa-solid fa-trash-can"
                            onClick={() => deleteHandler(obj._id)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mm-nosongd found">No songs found</div>
            )}
          </div>
        </div>

        <Footer />
      </div>
      <TsongPlayer
        title={currentSong.title}
        thumbnail={currentSong.thumbnail}
        url={currentSong.audio_url}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        audioRef={audioRef}
        playNextSong={playNextSong}
        playPreviousSong={playPreviousSong}
      />
    </>
  );
};

export default MyMusic;
