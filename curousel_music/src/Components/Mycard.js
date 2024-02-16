import React from "react";
import "./Mycard.css";
const Mycard = ({ list }) => {
  return (
    <>
      <div className="song-container">
        {list &&
          list.length > 0 &&
          list.map((obj, index) => (
            <div key={index} className="my-card">
              <div className="img-cont">
                <img src={obj.thumbnail} alt={obj.title} />
                <div className="overlay"></div>
              </div>
              <p className="song-name">{obj.title}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Mycard;
