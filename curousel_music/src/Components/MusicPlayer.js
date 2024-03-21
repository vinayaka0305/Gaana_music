// MusicPlayer.js
import React, { useState, useEffect, useRef } from "react";
import "./CSS/MusicPlayer.css";
import { useUser } from "../UseProvider";
import axios from "axios";
const MusicPlayer = (props) => {

  const { tracks,currentTrackIndex,setCurrentTrackIndex,setIsPlaying,isPlaying,playPauseHandler,audioRef } = props
  const {getToken} = useUser();
  const[getWatchList,setWatchList] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentTrackIndex,isPlaying,tracks]);

  useEffect(()=>{
    setWatchList(false)
  },[currentTrackIndex])

  const playNextTrack = () => {
    setCurrentTrackIndex(prevIndex =>
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(true);
  };

  const playPreviousTrack = () => {
    setCurrentTrackIndex(prevIndex =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
  };



  const onClickHandler=(songId)=>{
    console.log(songId,"songid");
    axios.patch("https://academics.newtonschool.co/api/v1/music/favorites/like",{songId:songId},{
      headers:{
        Authorization:`Bearer ${getToken}`
      }
    }).then((result)=>{
      // console.log(result);
      setWatchList(true);
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className="music-player">
      <div className="flex-row current-music">
        {tracks[currentTrackIndex] && (
          <div className="song-cover">
            <img
              src={tracks[currentTrackIndex].thumbnail}
              alt="Song Cover"
              height={40}
              width={40}
            />
          </div>
        )}
        <div className="flex-row song-info">
          {tracks[currentTrackIndex] && (
            <strong className="t_over">{tracks[currentTrackIndex].title}</strong>
          )}
        </div>
      </div>
      <div className="flex-row music-controls">
        <button
          title="Previous Song"
          className="prev sm-hide"
          onClick={playPreviousTrack}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <g
              className="a-svg_color"
              transform="translate(-655 -2658) translate(87 2624)"
            >
              <g transform="translate(520 29) rotate(-180 32.714 12.5)">
                <path
                  d="M5.187 2.955L12.588 12.834 -2.215 12.834z"
                  transform="rotate(90 5.187 7.895)"
                ></path>
                <rect
                  width="1.482"
                  height="14.803"
                  x="9.632"
                  y=".74"
                  rx=".741"
                ></rect>
              </g>
            </g>
          </svg>
        </button>
        <button className="play" onClick={playPauseHandler}>
          <svg width="13" height="14" viewBox="0 0 16 24">
            <path
              className="a-svg_color"
              fillRule="evenodd"
              d={
                isPlaying
                  ? "M5 0h4v24h-4V0zm6 0h4v24h-4V0z"
                  : "M0 0v24l20-12z"
              }
            ></path>
          </svg>
        </button>
        <button
          title="Next Song"
          className="next sm-hide"
          onClick={playNextTrack}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ transform: "scaleX(-1)" }}
          >
            <g
              className="a-svg_color"
              transform="translate(-655 -2658) translate(87 2624)"
            >
              <g transform="translate(520 29) rotate(-180 32.714 12.5)">
                <path
                  d="M5.187 2.955L12.588 12.834 -2.215 12.834z"
                  transform="rotate(90 5.187 7.895)"
                ></path>
                <rect
                  width="1.482"
                  height="14.803"
                  x="9.632"
                  y=".74"
                  rx=".741"
                ></rect>
              </g>
            </g>
          </svg>
        </button>
        {getToken && !getWatchList && <i onClick={()=>onClickHandler(tracks[currentTrackIndex]._id)} class="fa-regular fa-heart"></i>}
        {getToken && getWatchList && <i style={{color:"red"}} class="fa-solid fa-heart"></i> }
      </div>
      <div className="flex-row music-quality">
        {/* <div className="song-info">
          <small className="t_over">Up Next</small>
          <strong className="t_over2">{}</strong>
        </div>
        <div>
          <button title="Queue" className="_d">
            <svg width="14" height="12" viewBox="0 0 10 17">
              <path
                className="svg_color"
                fill="#000"
                fillRule="evenodd"
                d="M1.414 0L0 1.414l7 7-7 7 1.414 1.414 8.414-8.414z"
              ></path>
            </svg>
          </button>
        </div> */}
      </div>
      {tracks[currentTrackIndex] && (
        <audio ref={audioRef} src={tracks[currentTrackIndex].audio_url}/>
      )}
    </div>
  );
};

export default MusicPlayer;
