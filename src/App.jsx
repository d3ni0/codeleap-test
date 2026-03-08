import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SignupModal from './components/SignupModal';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostFilters from './components/PostFilters';
import DeleteModal from './components/DeleteModal';
import EditModal from './components/EditModal';
import { useInfinitePosts } from './hooks/usePosts';
import usePostFilters from './hooks/usePostFilters';
import { getUsername, clearUsername } from './utils/localStorage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function MainApp() {
  const [username, setUsername] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);
  const { user, loading, signOut } = useAuth();
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingPosts,
    error: postsError,
  } = useInfinitePosts();

  const posts = data?.pages.flatMap((page) => page.results) ?? [];
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
    filteredPosts,
  } = usePostFilters(posts);

  useEffect(() => {
    const savedUsername = getUsername();
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleSignupComplete = () => {
    setUsername(getUsername());
  };

  const handleLogout = async () => {
    await signOut();
    clearUsername();
    setUsername(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading..." />
      </div>
    );
  }

  if (!user && !username) {
    return <SignupModal onComplete={handleSignupComplete} />;
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Header username={user?.displayName || username} onLogout={handleLogout} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-8">
        <PostForm />

        <PostFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
        />

        <PostList
          onEdit={setPostToEdit}
          onDelete={setPostToDelete}
          filteredPosts={filteredPosts}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoadingPosts}
          error={postsError}
        />
      </main>

      <Footer />

      {postToDelete && (
        <DeleteModal
          post={postToDelete}
          onClose={() => setPostToDelete(null)}
        />
      )}

      {postToEdit && (
        <EditModal
          post={postToEdit}
          onClose={() => setPostToEdit(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </QueryClientProvider>
  );
}
