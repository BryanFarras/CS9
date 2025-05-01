import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import songs from '../components/Album.jsx'; 

function HomePage({ user }) {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 px-6 md:px-12 lg:px-24">
      {/* Welcome Section */}
      <section className="mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-color_green1">
          Welcome back, <span className="text-color_green5">{user?.email.split('@')[0]}</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Explore the artificial soundscapes created by Bryan Farras and immerse yourself in nature-inspired compositions.
        </p>
        <Link 
          to="/albums" 
          className="inline-block bg-color_green5 text-white py-3 px-8 rounded-lg hover:bg-opacity-90 transition duration-300"
        >
          Store
        </Link>
      </section>


      {/* Featured Content */}
      <section className="mb-20">
        <h2 className="text-color_green5 text-2xl font-bold mb-6 border-b pb-2">Featured Albums</h2>
        <div className="flex flex-wrap justify-center items-center">
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div className="h-48 bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={songs[2].image} 
                  alt={songs[2].title} 
                  className="w-full h-full object-cover rounded-t-xl" 
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-color_green5">{songs[2].title}</h3>
              <p className="text-gray-500 mb-4">{songs[2].releaseDate}</p>
              <p className="text-gray-700 mb-4">{songs[2].description}</p>
              <Link
                to={`/albums/${encodeURIComponent(songs[2].title)}`}
                className="text-color_green5 font-medium hover:underline"
              >
                Listen Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;