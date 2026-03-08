import { AnimatePresence } from 'framer-motion';
import PostCard from './PostCard';
import LoadingSpinner from './LoadingSpinner';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

export default function PostList({
  onEdit,
  onDelete,
  filteredPosts,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  error,
}) {
  const loadMoreRef = useInfiniteScroll(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    hasNextPage,
    isFetchingNextPage
  );

  if (isLoading) {
    return (
      <div className="py-8">
        <LoadingSpinner message="Loading posts..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
        <p>Error loading posts. Please try again later.</p>
      </div>
    );
  }

  const posts = filteredPosts ?? [];

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-dark-yellow">No posts yet. Be the first to post!</p>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>

      {hasNextPage && (
        <div ref={loadMoreRef} className="text-center py-8">
          {isFetchingNextPage ? (
            <LoadingSpinner message="Loading more posts..." />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="px-6 py-2 bg-codeleap-blue text-white rounded font-semibold hover:bg-blue-600 transition-colors"
            >
              Load More
            </button>
          )}
        </div>
      )}

      {!hasNextPage && posts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No more posts to load</p>
        </div>
      )}
    </>
  );
}
