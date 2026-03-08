import { motion } from 'framer-motion';

export default function Header({ currentUser, onLogout }) {
  return (
    <header className="bg-dark-card text-dark-yellow py-4 sm:py-6 px-4 shadow-md border-b border-gray-800">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">CodeLeap Network</h1>
        
        <div className="flex items-center gap-3 sm:gap-4">
          {currentUser?.photoURL && (
            <img 
              src={currentUser.photoURL} 
              alt={currentUser.displayName}
              className="w-8 h-8 rounded-full border-2 border-dark-yellow"
            />
          )}
          <span className="text-sm sm:text-base hidden sm:block">
            Hello, <span className="font-bold">{currentUser?.displayName}</span>
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white text-sm rounded font-semibold hover:bg-red-700 transition-colors"
          >
            Logout
          </motion.button>
        </div>
      </div>
    </header>
  );
}
