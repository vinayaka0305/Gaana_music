import axios from "axios"; // Import statement should be placed at the top of the file
import React, { createContext, useContext, useEffect, useState } from "react";

const MusicContext = createContext();

export const useMusicContext = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  axios.interceptors.request.use((config) => {
    config.headers["projectid"] = "6marrwzascw6";
    return config;
  });

  const [list, setList] = useState([]);
  const [tList, setTrendingList] = useState([]);
  const [t20list, setT20List] = useState([]);

  const getMusicList = async () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/album?limit=50")
      .then((response) => {
        setList(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMusicList();
    onFilterSelection();
    onFilterSelectionT20Songs();
  }, []);

  const onFilterSelection = async () => {
    const queryString = {
      featured: "Trending songs",
    };
    axios
      .get("https://academics.newtonschool.co/api/v1/music/song", {
        params: {
          filter: JSON.stringify(queryString),
        },
      })
      .then((response) => {
        setTrendingList(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFilterSelectionT20Songs = async () => {
    const queryString = {
      featured: "Top 20 of this week",
    };
    axios
      .get("https://academics.newtonschool.co/api/v1/music/song", {
        params: {
          filter: JSON.stringify(queryString),
        },
      })
      .then((response) => {
        setT20List(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSearhDetails = async (event) => {
    const queryString = {
      title: event.target.value,
    };
    axios
      .get("https://academics.newtonschool.co/api/v1/music/song", {
        params: {
          search: JSON.stringify(queryString),
        },
      })
      .then((response) => {
        setTrendingList(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSearhDetailsAlbum = async (event) => {
    const queryString = {
      title: event.target.value,
    };
    axios
      .get("https://academics.newtonschool.co/api/v1/music/album", {
        params: {
          search: JSON.stringify(queryString),
        },
      })
      .then((response) => {
        setList(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MusicContext.Provider
      value={{ list, onSearhDetails, onSearhDetailsAlbum, tList, t20list }}
    >
      {children}
    </MusicContext.Provider>
  );
};
