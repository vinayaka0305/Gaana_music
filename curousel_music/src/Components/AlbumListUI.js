import React from "react";
import "./CSS/AlbumlistUi.css";
import { useMusicContext } from "../MusicContext";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const AlbumListUI = () => {
  const { list } = useMusicContext();
  console.log(list);

  const navigate = useNavigate();

  const navToAlbumDetails = (albumId) => {
    console.log(albumId)
    navigate(`/album/${albumId}`); // Navigate to AlbumDetails page with albumId as parameter
  };

  return (
    <>
      <div className="Al-container">
        <h1 className="Al-title">Album Songs</h1>
        <div className="Al-Album-cnt">
          {list.map((obj, index) => (
            <div className="Al-list" key={index}>
              <div className="Al-image-cnt" onClick={() => navToAlbumDetails(obj._id)}>
                <img src={obj.image} />
                <div className="overlay"></div>
              </div>
              <p className="Al-list-title">{obj.title}</p>
            </div>
          ))}
        </div>
        <Footer/>
      </div>
    
    </>
  );
};

export default AlbumListUI;
