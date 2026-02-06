import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getComments, addComment, deleteComment, getCommentCount } from '../utils/comments';
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

export default function CommentsSection({ postId, isOpen }) {
  const username = getUsername();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    setComments(getComments(postId));
  }, [postId]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(postId, username, newComment.trim());
      setComments(getComments(postId));
      setNewComment('');
    }
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(postId, commentId);
    setComments(getComments(postId));
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="border-t border-gray-800 pt-4 mt-4"
    >
      <h4 className="text-dark-yellow font-semibold mb-3 text-sm">Comments ({comments.length})</h4>
      
      <form onSubmit={handleAddComment} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-3 py-2 bg-dark-bg border border-gray-600 text-dark-yellow placeholder-gray-500 rounded text-sm focus:outline-none focus:ring-2 focus:ring-codeleap-blue focus:border-codeleap-blue transition-all duration-300"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-codeleap-blue text-white rounded font-semibold text-sm disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-600 hover:shadow-lg transition-all duration-300"
          >
            Post
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-dark-bg rounded p-3 border border-gray-800"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-dark-yellow font-semibold text-sm">@{comment.username}</span>
                  <span className="text-gray-500 text-xs">{getRelativeTime(comment.datetime)}</span>
                </div>
                {comment.username === username && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 hover:text-red-400 transition-colors"
                    aria-label="Delete comment"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-dark-yellow text-sm">{comment.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {comments.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-4">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </motion.div>
  );
}
