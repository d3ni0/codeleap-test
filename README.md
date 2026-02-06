# CodeLeap Network - Frontend Test

A feature-rich React-based social network application built with Vite, React Query, Tailwind CSS, and Framer Motion.

## Features

### Core Features
- ✅ **Firebase Authentication**: Google Sign-In with profile photo and name
- ✅ User authentication with logout functionality (localStorage fallback)
- ✅ Create, read, update, and delete posts
- ✅ Real-time post list updates
- ✅ Ownership-based edit/delete permissions
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Relative timestamps
- ✅ Form validation

### Bonus Features
- ✅ **Likes System**: Like/unlike posts with real-time counter
- ✅ **Comments System**: Add and delete comments on posts
- ✅ **Infinite Scroll**: Automatic loading of more posts as you scroll
- ✅ **Advanced Filtering**: Filter by all posts, your posts, or liked posts
- ✅ **Sorting Options**: Sort by newest, oldest, most liked, or most commented
- ✅ **Search**: Real-time search across titles, content, and usernames
- ✅ **Dark Theme**: Beautiful dark mode with yellow accents
- ✅ **"NEW" Badge**: Visual indicator for posts less than 1 hour old
- ✅ **Custom Scrollbar**: Themed scrollbar matching the design

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Authentication**: Firebase Auth (Google Sign-In)
- **Data Fetching**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Installation

```bash
# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env.local and fill in your Firebase credentials
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env.local` file in the root directory with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Usage

1. **Sign In**: 
   - Click "Continue with Google" for instant login with your Google account
   - Or enter a username for quick access (localStorage-based)
2. **Create Post**: Fill in the title and content, then click "Create"
3. **View Posts**: All posts are displayed with infinite scroll
4. **Like Posts**: Click the heart icon to like/unlike posts
5. **Comment**: Click the comment icon to expand the comments section
6. **Filter & Sort**: Use the filter bar to search, sort, and filter posts
7. **Edit Post**: Click the pencil icon on your own posts to edit
8. **Delete Post**: Click the trash icon on your own posts to delete
9. **Logout**: Click the logout button in the header to sign out

## API Integration

The application integrates with the CodeLeap test API:

- **Base URL**: `https://dev.codeleap.co.uk/careers/`
- **Endpoints**:
  - `GET /?limit=10&offset=0` - Fetch posts with pagination
  - `POST /` - Create new post
  - `PATCH /{id}/` - Update existing post
  - `DELETE /{id}/` - Delete post

**Note**: Likes and comments are stored in localStorage as the API doesn't provide these endpoints. In a production environment, these would be replaced with real API calls.

## Features Implemented

### Core Requirements
- ✅ Signup modal with username validation
- ✅ Post creation form with validation
- ✅ Post list with automatic updates
- ✅ Edit modal for own posts
- ✅ Delete confirmation modal for own posts
- ✅ Ownership-based permissions
- ✅ Header with user info and logout

### Bonus Features
- ✅ **Third-party Authentication**: Firebase Google Sign-In with profile integration
- ✅ **Likes**: Full like/unlike system with counter
- ✅ **Comments**: Add, view, and delete comments
- ✅ **Infinite Scroll**: Pagination with Intersection Observer
- ✅ **Sorting**: By date, likes, or comments
- ✅ **Filtering**: All posts, my posts, or liked posts
- ✅ **Search**: Real-time search with debouncing
- ✅ **Responsive Design**: Mobile, tablet, and desktop layouts
- ✅ **Animations**: Smooth transitions with Framer Motion
- ✅ **Loading States**: Skeleton screens and spinners
- ✅ **Dark Theme**: Custom color scheme with yellow accents
- ✅ **UX Enhancements**: "NEW" badges, custom scrollbar, hover effects, profile photos

## Design Decisions

1. **React Query**: Chosen for efficient server state management, automatic cache invalidation, and infinite scroll support
2. **Tailwind CSS v4**: Latest version with @theme syntax for custom colors
3. **Framer Motion**: Provides smooth, performant animations for modals and cards
4. **localStorage for Likes/Comments**: Simulates backend functionality while demonstrating frontend capabilities
5. **Modular Components**: Each component has a single responsibility for maintainability
6. **Custom Hooks**: Business logic separated into reusable hooks (usePostFilters, useInfiniteScroll)
7. **Intersection Observer**: Native browser API for performant infinite scroll
8. **Debounced Search**: 300ms debounce to reduce unnecessary filtering operations

## Project Structure

```
src/
├── components/
│   ├── SignupModal.jsx       # Welcome screen with Google Sign-In
│   ├── Header.jsx            # Header with user info, photo, and logout
├── config/
│   └── firebase.js           # Firebase configuration
├── contexts/
│   └── AuthContext.jsx       # Authentication context provider
├── components/
│   ├── PostForm.jsx          # Create post form
│   ├── PostCard.jsx          # Individual post display
│   ├── PostList.jsx          # Infinite scroll post list
│   ├── PostFilters.jsx       # Search, sort, and filter controls
│   ├── LikeButton.jsx        # Like/unlike button
│   ├── CommentsSection.jsx   # Comments display and input
│   ├── DeleteModal.jsx       # Delete confirmation
│   └── EditModal.jsx         # Edit post modal
├── services/
│   └── api.js                # API configuration
├── hooks/
│   ├── usePosts.js           # React Query hooks (regular + infinite)
│   ├── usePostFilters.js     # Filtering and sorting logic
│   └── useInfiniteScroll.js  # Intersection Observer hook
├── utils/
│   ├── localStorage.js       # Local storage helpers
│   ├── likes.js              # Likes management
│   └── comments.js           # Comments management
├── App.jsx                   # Main application
├── index.css                 # Global styles and animations
└── main.jsx                  # Application entry point
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
