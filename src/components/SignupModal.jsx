import { useState } from 'react';
import { motion } from 'framer-motion';
import { setUsername } from '../utils/localStorage';
import { useAuth } from '../contexts/AuthContext';

export default function SignupModal({ onComplete }) {
  const [username, setUsernameInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signInWithGoogle } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setUsername(username.trim());
      onComplete();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
      onComplete();
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-dark-bg flex flex-col items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-dark-card rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-md border border-gray-700"
      >
        <h1 className="text-xl font-bold mb-6 text-dark-yellow">Welcome to CodeLeap network!</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-200 rounded text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <label className="block text-sm mb-2 text-dark-yellow">
            Please enter your username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="John doe"
            className="w-full px-3 py-2 bg-dark-bg border border-gray-600 text-dark-yellow placeholder-gray-500 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-codeleap-blue focus:border-codeleap-blue transition-all duration-300"
          />
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!username.trim()}
              className="px-8 py-2 bg-codeleap-blue text-white rounded font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-600 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              ENTER
            </button>
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-dark-card text-gray-500">Or sign in with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          type="button"
          className="w-full px-4 py-3 bg-white text-gray-700 rounded font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>
      </motion.div>

      <footer className="absolute bottom-0 left-0 right-0 bg-dark-bg py-4 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-dark-yellow text-base font-medium">
            Developed by{' '}
            <a 
              href="https://d3ni0.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-dark-yellow hover:text-codeleap-blue transition-all duration-300 hover:scale-110 inline-block"
            >
              {'{ d3ni0 }'}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
