import React from "react";
import "./CSS/Songcard.css";
import MusicPlayer from "./MusicPlayer";

const SongCard = ({ album, song, tracks }) => {

  return (
    <>
      <div className="main-container-area">
        <div className="main-page-area">
          <div className="Ablum-container">
            <div className="top-side">
              <div className="image-container">
                {album && album.image && <img src={album.image} alt="Album Cover"/>}
              </div>
              <div className="name-container">
                <div>{album && album.title}</div>
              </div>
            </div>
            <div className="bottom-side">
              <table>
                <thead>
                  <tr>
                    <th>Tracks</th>
                  </tr>
                </thead>
                <tbody>
                  {tracks.map((track) => (
                    <tr key={track._id}>
                      <td>{track.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="right-side-area"></div>
      </div>
      <MusicPlayer tracks={tracks}/>
    </>
  );
};

export default SongCard;
