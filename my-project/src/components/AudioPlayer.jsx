// components/AudioPlayer.jsx
import React, { useRef, useEffect } from 'react';

const AudioPlayer = ({ currentSong, onClose }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {}); // Optional: auto-play
    }
  }, [currentSong]);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onClose(); // clear currentSong from App
  };

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

      <button
        onClick={handleClose}
        className="ml-4 text-gray-500 hover:text-red-600 text-xl font-bold"
        aria-label="Close player"
      >
        ×
      </button>
    </div>
  );
};

export default AudioPlayer;
