import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getLikeCount, hasUserLiked, toggleLike } from '../utils/likes';
import { getUsername } from '../utils/localStorage';

export default function LikeButton({ postId }) {
  const username = getUsername();
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setLikeCount(getLikeCount(postId));
    setIsLiked(hasUserLiked(postId, username));
  }, [postId, username]);

  const handleLike = () => {
    toggleLike(postId, username);
    setLikeCount(getLikeCount(postId));
    setIsLiked(hasUserLiked(postId, username));
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleLike}
      className="flex items-center gap-1.5 text-dark-yellow hover:text-red-500 transition-colors"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={isLiked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </motion.svg>
      <span className="text-sm font-medium">{likeCount}</span>
    </motion.button>
  );
}
