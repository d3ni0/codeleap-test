const COMMENTS_KEY = 'codeleap_comments';

// Get all comments data from localStorage
const getAllComments = () => {
  const data = localStorage.getItem(COMMENTS_KEY);
  return data ? JSON.parse(data) : {};
};

// Save comments data to localStorage
const saveComments = (comments) => {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
};

// Get comments for a specific post
export const getComments = (postId) => {
  const allComments = getAllComments();
  return allComments[postId] || [];
};

// Get comment count for a post
export const getCommentCount = (postId) => {
  return getComments(postId).length;
};

// Add a comment to a post
export const addComment = (postId, username, text) => {
  const allComments = getAllComments();
  const postComments = allComments[postId] || [];
  
  const newComment = {
    id: Date.now().toString(),
    username,
    text,
    datetime: new Date().toISOString(),
  };
  
  allComments[postId] = [...postComments, newComment];
  saveComments(allComments);
  
  return newComment;
};

// Delete a comment
export const deleteComment = (postId, commentId) => {
  const allComments = getAllComments();
  const postComments = allComments[postId] || [];
  
  allComments[postId] = postComments.filter(comment => comment.id !== commentId);
  saveComments(allComments);
};
