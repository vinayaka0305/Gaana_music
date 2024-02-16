import logo from "./logo.svg";
import "./App.css";
import ImageCurosel from "./Components/ImageCurosel";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  axios.interceptors.request.use((config) => {
    config.headers["projectid"] = "6marrwzascw6";
    return config;
  });

  const [list, setList] = useState([]);

  const getMusicList = async () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/song")
      .then((response) => {
        setList(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMusicList();
  }, []);

  return (
    <div className="App">
      <ImageCurosel list={list}/>
    </div>
  );
}

export default App;
