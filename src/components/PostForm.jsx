import { useState } from 'react';
import { useCreatePost } from '../hooks/usePosts';
import { getUsername } from '../utils/localStorage';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const createPost = useCreatePost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title.trim() && content.trim()) {
      try {
        await createPost.mutateAsync({
          username: getUsername(),
          title: title.trim(),
          content: content.trim(),
        });
        
        // Clear form after successful submission
        setTitle('');
        setContent('');
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const isFormValid = title.trim() && content.trim();

  return (
    <div className="bg-dark-card border border-gray-800 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 hover:border-gray-700 transition-all duration-300">
      <h2 className="text-base sm:text-lg font-bold mb-4 text-dark-yellow">What's on your mind?</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-dark-yellow">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Hello world"
            className="w-full px-3 py-2 bg-dark-bg border border-gray-600 text-dark-yellow placeholder-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-codeleap-blue focus:border-codeleap-blue transition-all duration-300"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-dark-yellow">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content here"
            rows="4"
            className="w-full px-3 py-2 bg-dark-bg border border-gray-600 text-dark-yellow placeholder-gray-500 rounded resize-none focus:outline-none focus:ring-2 focus:ring-codeleap-blue focus:border-codeleap-blue transition-all duration-300"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isFormValid || createPost.isPending}
            className="px-8 py-2 bg-codeleap-blue text-white rounded font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-600 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {createPost.isPending ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
