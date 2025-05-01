import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import songs from '../components/Album.jsx';

function AlbumCard({ song, index, setFocusedIndex, isFocused, isLastItem }) {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateVisibility = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;

      if (isLastItem) {
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY + windowHeight;

        if (documentHeight - scrollPosition < 100) {
          setFocusedIndex(index);
          return;
        }
      }

      if (Math.abs(elementCenter - viewportCenter) < rect.height * 0.6) {
        setFocusedIndex(index);
      }
    };

    calculateVisibility();
    window.addEventListener('scroll', calculateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', calculateVisibility);
  }, [index, setFocusedIndex, isLastItem]);

  const blurAmount = isFocused ? 0 : 3;
  const opacityValue = isFocused ? 1 : 0.6;
  const scaleValue = isFocused ? 1 : 0.97;

  const handleClick = () => {
    navigate(`/albums/${song.id}`);
  };

  return (
    <div
      ref={cardRef}
      className="flex flex-row items-center gap-10 p-8 transition-all duration-700 ease-in-out max-w-6xl w-full cursor-pointer"
      style={{
        opacity: opacityValue,
        filter: `blur(${blurAmount}px)`,
        transform: `scale(${scaleValue})`,
      }}
      onClick={handleClick}
    >
      <img
        src={song.image}
        alt={song.title}
        className="w-72 h-72 object-cover rounded-xl shadow-2xl"
      />
      <div className="flex flex-col justify-center text-left max-w-xl">
        <h3 className="text-2xl text-color_green5">{song.title}</h3>
        <p className="text-md text-gray-500 mb-4">{song.releaseDate}</p>
        <p className="text-sm text-gray-700 text-justify">{song.description}</p>
      </div>
    </div>
  );
}

function AlbumPage() {
  const [focusedIndex, setFocusedIndex] = useState(null);

  return (
    <>
      <div className="text-center text-black mt-24">
        <h1 className="fade-in-up text-4xl">Artificial Nature</h1>
        <h2 className="fade-in-to-left delay-1 text-2xl font-national">by Bryan Farras</h2>
        <p className="delay-1 py-5">If we never find nature, we create it.</p>
      </div>

      <main id="albums" className="flex-grow flex flex-col items-center gap-32 px-10">
        {songs.map((song, index) => (
          <AlbumCard
            key={index}
            index={index}
            song={{ ...song, id: index }} // inject dynamic ID here
            setFocusedIndex={setFocusedIndex}
            isFocused={focusedIndex === index}
            isLastItem={index === songs.length - 1}
          />
        ))}
      </main>

      <div className="h-96"></div>
    </>
  );
}

export default AlbumPage;
