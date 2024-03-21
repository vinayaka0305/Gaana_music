//Album
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MusicPlayer from "../AlbumsInHome/MusicPlayer";
import "../CSS/Player.css";

const AlbumDetails = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [artistNames, setArtistNames] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(new Audio());

  const fetchAlbumDetails = async () => {
    axios
      .get(`https://academics.newtonschool.co/api/v1/music/album/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setAlbum(response.data.data);
        setTracks(response.data.data.songs);
        const artistIds = response.data.data.songs.map(
          (track) => track.artist[0]
        );
        fetchArtistNames(artistIds);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAlbumDetails();
  }, [id]);

  const fetchArtistNames = async (artistIds) => {
    try {
      const response = await Promise.all(
        artistIds.map((artistId) =>
          axios.get(
            `https://academics.newtonschool.co/api/v1/music/artist/${artistId}`
          )
        )
      );
      const names = response.map((response) => response.data.data.name);
      setArtistNames(names);
    } catch (err) {
      console.log(err);
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

  const songSelection=(index)=>{
    setCurrentTrackIndex(index)
    setIsPlaying(true)
  }

  if (!album) {
    return <div>Loading...</div>;
  }
  const { title, image } = album;
  return (
    <div className="a-tsongs-main-container">
      <div className="a-tsongs-container">
        <div className="a-tsongs-top">
          <div className="a-tsong-img">
            <img src={image} alt="Album Cover" />
          </div>
          <div className="a-tsong-names">
            <div>
              <h3 className="a-Tsongs-h3">{title}</h3>
            </div>
            <div>
              <button className="a-tPlay-btn" onClick={playPauseHandler}>
              {isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          </div>
        </div>
        <div className="a-tsongs-bottom">
          <div className="a-table-container">
            <div className="a-thead">
              <div className="a-track-heading-container">
                <div className="a-th a-th-heading-tracks">Tracks</div>
              </div>
              <div className="a-artist-heading-container">
                <div className="a-th a-th-heading-tracks">Artist</div>
              </div>{" "}
            </div>
            <div className="a-tbody">
              {tracks.length>0 ? tracks.map((track, index) => (
                <div className="a-tr" key={track._id}>
                  <div>
                    <img src={image} style={{height:30,width:30}}/>
                  </div>
                  <div className="a-track-container">
                    <div className="a-td Tsongs-h2" onClick={()=>songSelection(index)}>{track.title}</div>
                  </div>
                  <div className="a-artist-container">
                    <div className="a-td Tsongs-h3">{artistNames[index]}</div>{" "}
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

export default AlbumDetails;
