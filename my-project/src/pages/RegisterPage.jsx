import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Password mismatch validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate registration delay
    setTimeout(() => {
      // In a real application, you would connect to a registration API here
      // For now, we'll just simulate successful registration
      setIsLoading(false);

      // Navigate to the login page after successful registration
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b">
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo and Heading */}
          <div className="text-center mb-10">
            <h1 className="text-5xl mb-3 font-bold text-color_green5">Artificial Nature</h1>
            <h2 className="text-xl text-gray-600 font-national">by Bryan Farras</h2>
          </div>

          {/* Register Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">Create an Account</h3>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-color_green5 focus:border-transparent outline-none transition"
                  placeholder="your@email.com"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-color_green5 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-color_green5 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-color_green5 text-white rounded-lg font-medium transition duration-300 
                  ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'}`}
              >
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-color_green5 hover:underline font-medium">
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Bryan Farras — All Rights Reserved.
      </footer>
    </div>
  );
}

export default RegisterPage;
