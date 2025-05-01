import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar.jsx';
import AlbumPage from './pages/AlbumPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductDetail from './pages/ProductDetail.jsx'; // ⬅️ Tambahkan ini

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const audioRef = useRef(null);

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

  const AudioPlayer = () => {
    if (!currentSong) return null;
    
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner py-4 px-8 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <img src={currentSong.image} alt={currentSong.title} className="w-16 h-16 object-cover rounded" />
          <div>
            <h3 className="text-lg font-semibold text-color_green5">{currentSong.title}</h3>
            <p className="text-sm text-gray-500">{currentSong.releaseDate}</p>
          </div>
        </div>
        <audio controls ref={audioRef} className="w-1/2">
          <source src={currentSong.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
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

          {/* ✅ Tambahkan detail album berdasarkan ID */}
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
        
        <AudioPlayer />
        
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
