// App.js
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header } from "./Components/Header";
import Nav from "./Components/Nav";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import TrendingSongs from "./Components/TrendingSongs";
import { MusicProvider } from "./MusicContext";
import TrendingSongsDetails from "./Components/TrendingSongsDetails";
import Player from "./Components/Player";
import SignUpPage from "./Components/SignUpPage";
import MyMusic from "./Components/MyMusic";
import { useUser } from "./UseProvider";
import AlbumListUI from "./Components/AlbumListUI";
import AlbumDetails from "./Components/AlbumDetails";
import T20Songs from "./Components/Top20Songs";
import SubscribePage from "./Components/SubscribePage";




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
