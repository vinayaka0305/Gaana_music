import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "./Components/Header";
import Nav from "./Components/Nav";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import TrendingSongs from "./Components/TrendingSongs";

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

  const onSearhDetails=(event)=>{
    const queryString = {
      title:event.target.value,
    }
    axios.get("https://academics.newtonschool.co/api/v1/music/song",{
      params:{
        search:JSON.stringify(queryString),
      }
    }).then((response)=>{
      setList(response.data.data);
    }).catch((err)=>{
      console.log(err);
    })
  };

  const onFilterSelection=async(input)=>{
    const queryString = {
      featured:input,
    }
    axios.get("https://academics.newtonschool.co/api/v1/music/song",{
      params:{
        filter: JSON.stringify(queryString)
      }
    }).then((response)=>{
      setList(response.data.data);
    }).catch((err)=>{
      console.log(err);
    })
} 
  
  return (
    <Router>
    <Header search={onSearhDetails}/>
    <Nav onFilterSelection={onFilterSelection}/>
    <Routes>
      <Route path="/" element={<HomePage list={list} />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/TrendingSongs" element={< TrendingSongs list={list}/>}/>
    </Routes>
  </Router> 
  );
}

export default App;
