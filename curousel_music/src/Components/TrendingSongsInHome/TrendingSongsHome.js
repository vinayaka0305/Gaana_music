import React from "react";
import "../CSS/Mycard.css";
import { useMusicContext } from "../../MusicContext";
import { Link } from "react-router-dom";

const TrendingSongsHome = () => {
  const { tList } = useMusicContext();
  // console.log(tList);
  // const artistList = artist.map((item)=>item.name).join(" & ");

  return (
    <>
      <div className="song-container">
        {tList &&
          tList.length > 0 &&
          tList.map((obj, index) => (
            <Link className="custom-link" to={`/song/${obj._id}`} key={index}>
              {" "}
              {/* Use Link to navigate to dynamic card details page */}
              <div className="my-card">
                <div className="img-cont">
                  <img src={obj.thumbnail} alt={obj.title} />
                  {/* <div>
                    {obj.artist.map((item) => item.name).join(" & ") }
                    </div> */}
                  <div className="overlay"></div>
                </div>
                <p className="song-name">{obj.title}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default TrendingSongsHome;
