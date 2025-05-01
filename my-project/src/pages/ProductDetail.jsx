import { useParams } from 'react-router-dom';
import albums from '../components/Album.jsx';
import { useEffect, useState } from 'react';

function ProductDetail({ onPlay }) {
  const { id } = useParams();
  const album = albums[id];
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedType, setSelectedType] = useState('Vinyl');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (album) {
      setPrice(selectedType === 'Vinyl' ? album.vinylPrice : album.digitalPrice);
    }

    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setWishlist(storedWishlist);
    setCart(storedCart);
  }, [id, selectedType, album]);

  const handleAddToWishlist = () => {
    const updated = [...wishlist, { ...album, selectedType }];
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    alert('Added to wishlist!');
  };

  const handleAddToCart = () => {
    const updated = [...cart, { ...album, selectedType }];
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    alert('Added to cart!');
  };

  if (!album) {
    return <div className="p-10">Album not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-32 px-6 font-encode">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={album.image}
          alt={album.title}
          className="w-full md:w-72 h-72 object-cover rounded-xl shadow-lg"
        />

        <div className="flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-color_green5">{album.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{album.releaseDate}</p>
            <p className="text-justify text-gray-700 mb-4">{album.description}</p>

            <div className="flex gap-4 mb-4">
              <button
                className={`px-4 py-2 rounded-full border ${
                  selectedType === 'Vinyl'
                    ? 'bg-black text-white'
                    : 'bg-white text-black border-gray-400'
                }`}
                onClick={() => setSelectedType('Vinyl')}
              >
                Vinyl
              </button>
              <button
                className={`px-4 py-2 rounded-full border ${
                  selectedType === 'Digital'
                    ? 'bg-black text-white'
                    : 'bg-white text-black border-gray-400'
                }`}
                onClick={() => setSelectedType('Digital')}
              >
                Digital
              </button>
            </div>

            <p className="text-lg text-black font-semibold">
              Price: ${price.toLocaleString('en-US')}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => onPlay(album)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
            >
              Play Preview
            </button>

            <button
              onClick={handleAddToWishlist}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl"
            >
              Add to Wishlist
            </button>

            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {album.audios?.length > 0 && (
        <div className="mt-10 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-color_green5">Tracklist:</h3>
          <ul className="space-y-4">
            {album.audios.map((track, idx) => (
              <li key={idx} className="flex items-center gap-4">
                <span className="w-6 text-gray-600">{idx + 1}.</span>
                {typeof track === 'object' ? (
                  <>
                    <span className="text-sm text-black w-56">{track.title}</span>
                    <audio controls className="flex-1">
                      <source src={track.file} type="audio/mp3" />
                    </audio>
                  </>
                ) : (
                  <audio controls className="w-full">
                    <source src={track} type="audio/mp3" />
                  </audio>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
