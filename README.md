# CodeLeap Network - Frontend Test

A feature-rich React-based social network application built with Vite, React Query, Tailwind CSS, and Framer Motion.

## Features

### Core Features
- ✅ User authentication with logout functionality
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
- **Styling**: Tailwind CSS
- **Data Fetching**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Sign Up**: Enter your username on the welcome screen
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
- ✅ **UX Enhancements**: "NEW" badges, custom scrollbar, hover effects

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
│   ├── SignupModal.jsx       # Welcome screen
│   ├── Header.jsx            # Header with user info and logout
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
