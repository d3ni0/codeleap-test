import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import SignupModal from './components/SignupModal';
import PostForm from './components/PostForm';
import PostCard from './components/PostCard';
import DeleteModal from './components/DeleteModal';
import EditModal from './components/EditModal';
import { usePosts } from './hooks/usePosts';
import { getUsername } from './utils/localStorage';

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
  
  const { data: posts, isLoading, error } = usePosts();

  useEffect(() => {
    const savedUsername = getUsername();
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleSignupComplete = () => {
    setUsername(getUsername());
  };

  if (!username) {
    return <SignupModal onComplete={handleSignupComplete} />;
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <header className="bg-codeleap-blue text-white py-4 sm:py-6 px-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold">CodeLeap Network</h1>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-8">
        <PostForm />

        {isLoading && (
          <div className="text-center py-8">
            <p className="text-dark-yellow">Loading posts...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
            <p>Error loading posts. Please try again later.</p>
          </div>
        )}

        {posts && posts.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <p className="text-dark-yellow">No posts yet. Be the first to post!</p>
          </div>
        )}

        <AnimatePresence>
          {posts?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={setPostToEdit}
              onDelete={setPostToDelete}
            />
          ))}
        </AnimatePresence>
      </main>

      <footer className="bg-dark-card border-t border-gray-800 py-6 px-4 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-dark-yellow text-sm">
            Developed by{' '}
            <a 
              href="https://d3ni0.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold hover:text-codeleap-blue transition-all duration-300 underline decoration-2 underline-offset-2 hover:scale-110 inline-block"
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
