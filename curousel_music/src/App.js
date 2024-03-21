// App.js
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header } from "./Components/Header&Footer/Header";
import Nav from "./Components/Nav/Nav";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/Login_signup/LoginPage";
import TrendingSongs from "./Components/TrendingSongsList/TrendingSongs";
import { MusicProvider } from "./MusicContext";
import TrendingSongsDetails from "./Components/TrendingSongsInHome/TrendingSongsDetails";
import Player from "./Components/AlbumsInHome/Player";
import SignUpPage from "./Components/Login_signup/SignUpPage";
import MyMusic from "./Components/Sidebar/MyMusic";
import { useUser } from "./UseProvider";
import AlbumListUI from "./Components/AlbumList/AlbumListUI";
import AlbumDetails from "./Components/AlbumList/AlbumDetails";
import T20Songs from "./Components/Top20Songs/Top20Songs";
import SubscribePage from "./Components/SubscribePage/SubscribePage";




export const ThemeContext = createContext(null);

function App() {
  const[theme,setTheme] = useState("dark")

  const toggleTheme =()=>{
    setTheme((curr)=>(curr==="light"?"dark":"light"))
  }
  const { getToken } = useUser();
  // console.log(getToken);
  function ProtectedRoute({ children }) {
    if (getToken) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }


  return (
    <ThemeContext.Provider value={{theme,toggleTheme}}>
      <div className="app-container" id={theme}>
        <Router>
          <MusicProvider>
            <Header theme={theme} toggleTheme={toggleTheme}/>
            <Nav />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/TrendingSongs" element={<TrendingSongs />} />
              <Route path="/Top_20" element ={<T20Songs/>}/>
              <Route path="/album" element={<AlbumListUI />} />
              <Route path="/song/:id" element={<TrendingSongsDetails />} />
              <Route path="/player" element={<Player />} />
              <Route path="/album/:id" element={<AlbumDetails/>}/>
              <Route
                path="/mymusic"
                element={
                  <ProtectedRoute>
                    <MyMusic />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subscribe"
                element={
                  <ProtectedRoute>
                    <SubscribePage/>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </MusicProvider>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
