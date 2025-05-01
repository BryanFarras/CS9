import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet';

import Navbar from '../src/components/NavBar.jsx';
import AudioPlayer from '../src/components/AudioPlayer.jsx'; // ✅ Komponen terpisah
import AlbumPage from '../src/pages/AlbumPage.jsx';
import LoginPage from '../src/pages/LoginPage.jsx';
import HomePage from '../src/pages/HomePage.jsx';
import ProductDetail from '../src/pages/ProductDetail.jsx';

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handlePlay = (song) => {
    setCurrentSong(song);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCurrentSong(null);
    localStorage.removeItem('user');
  };

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="w-full min-h-screen">
        <Helmet>
          <title>Artificial Nature</title>
        </Helmet>

        {isLoggedIn && (
          <Navbar
            visible={showNavbar}
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={handleLogout}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/home" replace /> : <LoginPage onLogin={handleLogin} />}
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <div className="flex flex-col min-h-screen font-encode">
                  <HomePage user={user} />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/albums"
            element={
              <ProtectedRoute>
                <div className="flex flex-col min-h-screen font-encode">
                  <AlbumPage onPlay={handlePlay} />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/albums/:id"
            element={
              <ProtectedRoute>
                <div className="flex flex-col min-h-screen font-encode">
                  <ProductDetail onPlay={handlePlay} />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* ✅ AudioPlayer tidak akan unmount saat pindah halaman */}
        <AudioPlayer currentSong={currentSong} onClose={() => setCurrentSong(null)} />


        <footer className="w-screen py-4 bg-black text-white relative left-1/2 right-1/2 -translate-x-1/2 bottom-0">
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Bryan Farras — All Rights Reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
