import React, { useState, useEffect, useRef } from "react";
import { useMusicContext } from "../MusicContext";
import { useParams } from "react-router-dom";
import SongsMusicPlayer from "./SongsMusicPlayer";

const TrendingSongsDetails = () => {
  const { tList } = useMusicContext();
  const { id } = useParams();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState(null); // Initialize currentSong state

  useEffect(() => {
    // Find the index of the song with the matching id
    const songIndex = tList.findIndex((song) => song._id === id);
    if (songIndex !== -1) {
      setCurrentSongIndex(songIndex);
    }
  }, [id, tList]);

  useEffect(() => {
    let isLoaded = false;
    let audio = audioRef.current;

    // Pause any existing audio playback
    if (audio) {
      audio.pause();
    }

    // Set up a new Audio element if currentSong exists
    if (currentSong) {
      audio = new Audio(currentSong.audio_url);
      audioRef.current = audio;

      // When metadata is loaded, set isLoaded to true
      audio.onloadedmetadata = () => {
        isLoaded = true;
        if (isPlaying) {
          audio.play();
        }
      };

      // If audio is already loaded when isPlaying changes, play it
      if (isLoaded && isPlaying) {
        audio.play();
      }
    }

    return () => {
      // Cleanup: Remove onloadedmetadata event handler when component unmounts
      if (audio) {
        audio.onloadedmetadata = null;
      }
    };
  }, [currentSongIndex, isPlaying, tList, currentSong]);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
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

  useEffect(() => {
    if (currentSongIndex !== null && tList.length > 0) {
      setCurrentSong(tList[currentSongIndex]);
    }
  }, [currentSongIndex, tList]);

  if (!currentSong) {
    return <div>Song Not found</div>;
  }

  // Render the SongsMusicPlayer component with current song details
  return (
    <div>
      <SongsMusicPlayer
        title={currentSong.title}
        thumbnail={currentSong.thumbnail}
        url={currentSong.audio_url}
        songId={currentSong._id}
        currentSong={currentSong}
        playNextSong={playNextSong}
        playPreviousSong={playPreviousSong}
        isPlaying={isPlaying}
        audioRef={audioRef}
        togglePlayPause={togglePlayPause}
        artists={currentSong.artist.map((artist) => artist.name).join(", ")}
      />
    </div>
  );
};

export default TrendingSongsDetails;
