import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignupModal from './components/SignupModal';
import Header from './components/Header';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostFilters from './components/PostFilters';
import DeleteModal from './components/DeleteModal';
import EditModal from './components/EditModal';
import { usePosts } from './hooks/usePosts';
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
  
  const { data: posts } = usePosts();
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

  const handleLogout = () => {
    clearUsername();
    setUsername(null);
  };

  if (!username) {
    return <SignupModal onComplete={handleSignupComplete} />;
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Header username={username} onLogout={handleLogout} />

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
        />
      </main>

      <footer className="bg-dark-bg py-6 px-4 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-dark-yellow text-base font-medium">
            Developed by{' '}
            <a 
              href="https://d3ni0.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-dark-yellow hover:text-codeleap-blue transition-all duration-300 hover:scale-110 inline-block"
            >
              {'{ d3ni0 }'}
            </a>
          </p>
        </div>
      </footer>

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
      <MainApp />
    </QueryClientProvider>
  );
}
