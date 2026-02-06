const LIKES_KEY = 'codeleap_likes';

// Get all likes data from localStorage
const getAllLikes = () => {
  const data = localStorage.getItem(LIKES_KEY);
  return data ? JSON.parse(data) : {};
};

// Save likes data to localStorage
const saveLikes = (likes) => {
  localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
};

// Get likes for a specific post
export const getLikes = (postId) => {
  const allLikes = getAllLikes();
  return allLikes[postId] || [];
};

// Get like count for a post
export const getLikeCount = (postId) => {
  return getLikes(postId).length;
};

// Check if user has liked a post
export const hasUserLiked = (postId, username) => {
  const likes = getLikes(postId);
  return likes.includes(username);
};

// Toggle like for a post
export const toggleLike = (postId, username) => {
  const allLikes = getAllLikes();
  const postLikes = allLikes[postId] || [];
  
  if (postLikes.includes(username)) {
    // Remove like
    allLikes[postId] = postLikes.filter(user => user !== username);
  } else {
    // Add like
    allLikes[postId] = [...postLikes, username];
  }
  
  saveLikes(allLikes);
  return allLikes[postId];
};
