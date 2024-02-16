import React from "react";

function Songs({ list }) {
  console.log(list);
  return (
    <>
      <div className="song-sections">
            <h2 className="section-heading">Songs</h2>
            <div className="songs-container">
              {list &&
                list.length > 0 &&
                list.map((obj, index) => (
                  <div key={index} className="song-card">
                    <div className="img-cont">
                      <img src={obj.thumbnail} alt={obj.title} />
                      <div className="overlay"></div>
                    </div>
                    <p className="song-name">{obj.title}</p>
                  </div>
                ))}
            </div>
          </div>
    </>
  )
}

export default Songs;
