import { motion } from 'framer-motion';
import { getUsername } from '../utils/localStorage';

const getRelativeTime = (datetime) => {
  const now = new Date();
  const posted = new Date(datetime);
  const diffMs = now - posted;
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

export default function PostCard({ post, onEdit, onDelete }) {
  const currentUsername = getUsername();
  const isOwner = post.username === currentUsername;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-dark-card border border-gray-700 rounded-lg overflow-hidden mb-4 hover:shadow-xl hover:border-gray-600 transition-all"
    >
      <div className="bg-codeleap-blue text-white px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <h3 className="font-bold text-base sm:text-lg truncate pr-2">{post.title}</h3>
        {isOwner && (
          <div className="flex gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={() => onEdit(post)}
              className="hover:opacity-80 transition-opacity"
              aria-label="Edit post"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(post)}
              className="hover:opacity-80 transition-opacity"
              aria-label="Delete post"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 gap-1 sm:gap-0">
          <span className="font-semibold text-dark-yellow">@{post.username}</span>
          <span>{getRelativeTime(post.created_datetime)}</span>
        </div>
        
        <p className="text-dark-yellow whitespace-pre-wrap text-sm sm:text-base break-words">{post.content}</p>
      </div>
    </motion.div>
  );
}
