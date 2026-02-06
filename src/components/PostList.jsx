import { AnimatePresence } from 'framer-motion';
import PostCard from './PostCard';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { useInfinitePosts } from '../hooks/usePosts';

export default function PostList({ onEdit, onDelete, filteredPosts = null }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfinitePosts();

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
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-dark-yellow"></div>
        <p className="text-dark-yellow mt-2">Loading posts...</p>
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

  // Use filtered posts if provided, otherwise use infinite query data
  const posts = filteredPosts || data?.pages.flatMap((page) => page.results) || [];

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

      {!filteredPosts && hasNextPage && (
        <div ref={loadMoreRef} className="text-center py-8">
          {isFetchingNextPage ? (
            <>
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-dark-yellow"></div>
              <p className="text-dark-yellow mt-2">Loading more posts...</p>
            </>
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

      {!filteredPosts && !hasNextPage && posts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No more posts to load</p>
        </div>
      )}
    </>
  );
}
