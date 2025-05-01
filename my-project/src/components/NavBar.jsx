import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ visible, isLoggedIn, user, onLogout }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    setShowMenu(false);
    onLogout();
    navigate('/login');
  };
  
  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex justify-between items-center px-8 py-4 z-40 bg-white shadow-md transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex items-center">
        <Link to="/home" className="text-xl font-semibold">Artificial Nature</Link>
      </div>
      
      <div className="flex items-center gap-6">
        {isLoggedIn && (
          <>
            <Link to="/home" className="text-gray-700 hover:text-color_green5 transition">
              Home
            </Link>
            
            <Link to="/albums" className="text-gray-700 hover:text-color_green5 transition">
              Albums
            </Link>
            
            <div className="relative">
              <button 
                className="flex items-center gap-2"
                onClick={() => setShowMenu(!showMenu)}
              >
                <div className="w-8 h-8 bg-color_green5 text-white rounded-full flex items-center justify-center">
                  {user?.email.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:block">{user?.email.split('@')[0]}</span>
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowMenu(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowMenu(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;