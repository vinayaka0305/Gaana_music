// App.js
import React, { createContext, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./Components/Header&Footer/Header";
import Nav from "./Components/Nav/Nav";
import { MusicProvider } from "./MusicContext";
import { useUser } from "./UseProvider";
import LoginPage from "./Components/Login_signup/LoginPage";
import TrendingSongs from "./Components/TrendingSongsList/TrendingSongs";
import TrendingSongsDetails from "./Components/TrendingSongsInHome/TrendingSongsDetails";
import Player from "./Components/AlbumsInHome/Player";
import SignUpPage from "./Components/Login_signup/SignUpPage";
import MyMusic from "./Components/Sidebar/MyMusic";
import AlbumListUI from "./Components/AlbumList/AlbumListUI";
import AlbumDetails from "./Components/AlbumList/AlbumDetails";
import T20Songs from "./Components/Top20Songs/Top20Songs";
import SubscribePage from "./Components/SubscribePage/SubscribePage";
import Radio from "./Components/Radio&Poadcast/Radio";
import Podcast from "./Components/Radio&Poadcast/Podcast";

export const ThemeContext = createContext(null);

const HomePage = lazy(() => import("./Components/HomePage/HomePage"));

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  const { getToken } = useUser();

  function ProtectedRoute({ children }) {
    if (getToken) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app-container" id={theme}>
        <Router>
          <MusicProvider>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <Nav />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/TrendingSongs" element={<TrendingSongs />} />
              <Route path="/Top_20" element={<T20Songs />} />
              <Route path="/album" element={<AlbumListUI />} />
              <Route path="/song/:id" element={<TrendingSongsDetails />} />
              <Route path="/player" element={<Player />} />
              <Route path="/album/:id" element={<AlbumDetails />} />
              <Route path="/radio" element={<Radio />} />
              <Route path="/podcast" element={<Podcast />} />
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
                    <SubscribePage />
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
