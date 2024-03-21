// Homepage album
import React from "react";
import { useMusicContext } from "../../MusicContext";
import { useNavigate } from "react-router-dom"; // Import Link
import "../CSS/AlbumCard.css";

const AlbumSection = () => {
  const { list } = useMusicContext();

  const navigate = useNavigate();
  const PlayAlbum=(id,index)=>{
    navigate("/player",{state:{id:id,index:index}});
    // console.log(id);
  }
  return (
    <div className="Album-song-container">
      {list &&
        list.length > 0 &&
        list.map((song, index) => (
            <div className="my-albumCard" key={index} onClick={()=>PlayAlbum(song._id,index)}>
              <div className="album-img-cont">
                <img src={song.image} alt={song.title} />
                <div className="overlay"></div>
              </div>
              <p className="album-name">{song.title}</p>
            </div>
        ))}
    </div>
  );
};

export default AlbumSection;
