import React from "react";
import "../CSS/MusicPlayer.css";

const TsongPlayer = (props) => {
    const {
        title,
        thumbnail,
        url,
        playNextSong,
        playPreviousSong,
        isPlaying,
        togglePlayPause,
        audioRef 
      } = props;
      // console.log(url);

    //   console.log(artists);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const audioRef = useRef(new Audio(url));

  // let playPause = togglePlayPause = () => {
  //   if (isPlaying) {
  //     audioRef.current.pause();
  //   } else {
  //     audioRef.current.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  // useEffect(() => {
  //   audioRef.current.pause();
  //   audioRef.current = new Audio(url);
  //   if (isPlaying) {
  //     audioRef.current.play();
  //   }
  // }, [url]);

  return (
    <div className="music-player">
      <div className="flex-row current-music">
        <div className="song-cover">
          <img
            src={thumbnail}
            alt="Song Cover"
            height={40}
            width={40}
          />
        </div>
        <div className="flex-row song-info">
          <strong className="t_over">{title}</strong>
        </div>
      </div>
      <div className="flex-row music-controls">
        <button
          title="Previous Song"
          className="prev sm-hide"
          onClick={playPreviousSong}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <g
              className="svg_color_btns"
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
        <button className="play" onClick={togglePlayPause}>
          <svg width="13" height="14" viewBox="0 0 16 24">
            <path
              className="svg_color_btns"
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
           onClick={playNextSong}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ transform: "scaleX(-1)" }}
          >
            <g
               className="svg_color_btns"
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
      </div>
      <div className="flex-row music-quality">
        <div className="song-info">
          {/* <small className="t_over">Up Next</small>
          <strong className="t_over2">{}</strong> */}
        </div>
        <div>
          {/* <button title="Queue" className="_d">
            <svg width="14" height="12" viewBox="0 0 10 17">
              <path
                className="svg_color"
                fill="#000"
                fillRule="evenodd"
                d="M1.414 0L0 1.414l7 7-7 7 1.414 1.414 8.414-8.414z"
              ></path>
            </svg>
          </button> */}
        </div>
      </div>

      <audio src={url} ref={audioRef}/>
    </div>
  );
};

export default TsongPlayer;
