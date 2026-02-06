import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUsername } from '../utils/localStorage';
import LikeButton from './LikeButton';
import CommentsSection from './CommentsSection';
import { getCommentCount } from '../utils/comments';

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

const isNewPost = (datetime) => {
  const now = new Date();
  const posted = new Date(datetime);
  const diffMs = now - posted;
  const diffHours = diffMs / (1000 * 60 * 60);
  return diffHours < 1; // Less than 1 hour
};

export default function PostCard({ post, onEdit, onDelete }) {
  const currentUsername = getUsername();
  const isOwner = post.username === currentUsername;
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    setCommentCount(getCommentCount(post.id));
    const interval = setInterval(() => {
      setCommentCount(getCommentCount(post.id));
    }, 1000);
    return () => clearInterval(interval);
  }, [post.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-dark-card border border-gray-800 rounded-lg overflow-hidden mb-4 hover:shadow-2xl hover:shadow-codeleap-blue/10 hover:border-gray-600 hover:scale-[1.02] transition-all duration-300"
    >
      <div className="bg-dark-card text-dark-yellow px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h3 className="font-bold text-base sm:text-lg truncate">{post.title}</h3>
          {isNewPost(post.created_datetime) && (
            <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded-full flex-shrink-0 animate-pulse">
              NEW
            </span>
          )}
        </div>
        {isOwner && (
          <div className="flex gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={() => onEdit(post)}
              className="hover:opacity-80 hover:scale-110 transition-all duration-300"
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
              className="hover:opacity-80 hover:scale-110 transition-all duration-300"
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
        
        <p className="text-dark-yellow whitespace-pre-wrap text-sm sm:text-base break-words mb-4">{post.content}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
          <div className="flex items-center gap-4">
            <LikeButton postId={post.id} />
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1.5 text-dark-yellow hover:text-codeleap-blue transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-sm font-medium">{commentCount}</span>
            </button>
          </div>
        </div>
        
        <CommentsSection postId={post.id} isOpen={showComments} />
      </div>
    </motion.div>
  );
}
