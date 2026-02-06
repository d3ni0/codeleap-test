import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUpdatePost } from '../hooks/usePosts';

export default function EditModal({ post, onClose }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const updatePost = useUpdatePost();

  const handleSave = async () => {
    if (title.trim() && content.trim()) {
      try {
        await updatePost.mutateAsync({
          id: post.id,
          title: title.trim(),
          content: content.trim(),
        });
        onClose();
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  };

  const isFormValid = title.trim() && content.trim();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-dark-card border border-gray-700 rounded-lg shadow-xl p-6 w-full max-w-2xl"
        >
          <h2 className="text-xl font-bold mb-4 text-dark-yellow">Edit item</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-dark-yellow">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Hello world"
              className="w-full px-3 py-2 bg-dark-bg border border-gray-600 text-dark-yellow placeholder-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-codeleap-blue"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-dark-yellow">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content here"
              rows="4"
              className="w-full px-3 py-2 bg-dark-bg border border-gray-600 text-dark-yellow placeholder-gray-500 rounded resize-none focus:outline-none focus:ring-2 focus:ring-codeleap-blue"
            />
          </div>
          
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={updatePost.isPending}
              className="px-6 py-2 border border-gray-600 text-dark-yellow rounded font-semibold hover:bg-dark-bg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!isFormValid || updatePost.isPending}
              className="px-6 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {updatePost.isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
