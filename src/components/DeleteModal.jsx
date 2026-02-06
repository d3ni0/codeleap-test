import { motion, AnimatePresence } from 'framer-motion';
import { useDeletePost } from '../hooks/usePosts';

export default function DeleteModal({ post, onClose }) {
  const deletePost = useDeletePost();

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync(post.id);
      onClose();
    } catch (error) {
      // Error handled by React Query
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="bg-dark-card border border-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4 text-dark-yellow">Delete this post?</h2>
          
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={deletePost.isPending}
              className="px-6 py-2 border border-gray-600 text-dark-yellow rounded font-semibold hover:bg-dark-bg hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deletePost.isPending}
              className="px-6 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700 hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {deletePost.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
