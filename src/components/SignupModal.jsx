import { useState } from 'react';
import { motion } from 'framer-motion';
import { setUsername } from '../utils/localStorage';

export default function SignupModal({ onComplete }) {
  const [username, setUsernameInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setUsername(username.trim());
      onComplete();
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
