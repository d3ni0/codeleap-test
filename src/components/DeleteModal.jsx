import { motion, AnimatePresence } from 'framer-motion';
import { useDeletePost } from '../hooks/usePosts';

export default function DeleteModal({ post, onClose }) {
  const deletePost = useDeletePost();

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync(post.id);
      onClose();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-dark-card border border-gray-700 rounded-lg shadow-xl p-6 w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4 text-dark-yellow">Are you sure you want to delete this item?</h2>
          
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={deletePost.isPending}
              className="px-6 py-2 border border-gray-600 text-dark-yellow rounded font-semibold hover:bg-dark-bg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deletePost.isPending}
              className="px-6 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {deletePost.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
