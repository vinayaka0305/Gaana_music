import React, { useEffect, useState,useRef } from "react";
import "./CSS/Player.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MusicPlayer from "./MusicPlayer";
import "./CSS/Songcard.css";

const Player = () => {
  const location = useLocation();
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [artistNames, setArtistNames] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/music/album/${location.state?.id}`);
        console.log(response.data.data);
        setAlbum(response.data.data);
        setTracks(response.data.data.songs);
        const artistIds = response.data.data.songs.map(track => track.artist[0]); // Extracting artist IDs from each track
        fetchArtistNames(artistIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location.state?.id]);

  const fetchArtistNames = async (artistIds) => {
    try {
      const responses = await Promise.all(artistIds.map(artistId => axios.get(`https://academics.newtonschool.co/api/v1/music/artist/${artistId}`)));
      const names = responses.map(response => response.data.data.name); // Extracting artist names from responses
      setArtistNames(names);
    } catch (error) {
      console.error("Error fetching artist data:", error);
    //   setArtistNames(new Array(tracks.length).fill('Unknown Artist'));
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentTrackIndex, isPlaying, tracks]);

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
    console.log(setIsPlaying)
  };

  const songSelection =(index)=>{
    setCurrentTrackIndex(index)
    setIsPlaying(true)
  }

  if (!album) {
    return <div>Loading....</div>;
  }

  const { title, image } = album;

  return (
    <div className="tsongs-main-container">
      <div className="tsongs-container">
        <div className="tsongs-top">
          <div className="tsong-img">
            <img src={image} alt="Album Cover" />
          </div>
          <div className="tsong-names">
            <div>
                <h3 className="Tsongs-h3">{title}</h3>
            </div>
            <div>
            <button className="tPlay-btn" onClick={playPauseHandler}>
              {isPlaying ? "Pause" : "Play"}
              </button>
              </div>
          </div>
        </div>
        <div className="tsongs-bottom">
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
              { tracks.length > 0 ?tracks.map((track, index) => (
                <div className="tr" key={track._id}>
                  <div>
                    <img src={image} style={{height:30,width:30}}/>
                  </div>
                  <div className="track-container">
                    <div className="td Tsongs-h2" onClick={()=>songSelection(index)}>{track.title}</div>
                  </div>
                  <div className="artist-container">
                    <div className="td Tsongs-h3">{artistNames[index]}</div>{" "}
                    {/* Displaying corresponding artist name */}
                  </div>
                </div>
              )):<div className="no-songs">No songs on this album</div>}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <MusicPlayer
          tracks={tracks}
          currentTrackIndex={currentTrackIndex}
          setCurrentTrackIndex={setCurrentTrackIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
          playPauseHandler={playPauseHandler}
        />
      </div>
    </div>
  );
};

export default Player;
