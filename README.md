# CodeLeap Network - Frontend Test

A React-based social network application built with Vite, React Query, Tailwind CSS, and Framer Motion.

## Features

- ✅ User authentication (localStorage-based)
- ✅ Create, read, update, and delete posts
- ✅ Real-time post list updates
- ✅ Ownership-based edit/delete permissions
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Relative timestamps
- ✅ Form validation

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
3. **View Posts**: All posts are displayed in reverse chronological order (newest first)
4. **Edit Post**: Click the pencil icon on your own posts to edit
5. **Delete Post**: Click the trash icon on your own posts to delete

## API Integration

The application integrates with the CodeLeap test API:

- **Base URL**: `https://dev.codeleap.co.uk/careers/`
- **Endpoints**:
  - `GET /` - Fetch all posts
  - `POST /` - Create new post
  - `PATCH /{id}/` - Update existing post
  - `DELETE /{id}/` - Delete post

## Features Implemented

### Core Requirements
- ✅ Signup modal with username validation
- ✅ Post creation form with validation
- ✅ Post list with automatic updates
- ✅ Edit modal for own posts
- ✅ Delete confirmation modal for own posts
- ✅ Ownership-based permissions

### Bonus Features
- ✅ Responsive design for mobile and tablet
- ✅ Smooth animations and transitions
- ✅ Hover effects on interactive elements
- ✅ Loading states for async operations

## Design Decisions

1. **React Query**: Chosen for efficient server state management and automatic cache invalidation
2. **Tailwind CSS**: Enables rapid UI development with utility-first approach
3. **Framer Motion**: Provides smooth, performant animations
4. **Modular Components**: Each component has a single responsibility for maintainability
5. **Custom Hooks**: Business logic separated into reusable hooks

## Project Structure

```
src/
├── components/
│   ├── SignupModal.jsx    # Welcome screen
│   ├── PostForm.jsx        # Create post form
│   ├── PostCard.jsx        # Individual post display
│   ├── DeleteModal.jsx     # Delete confirmation
│   └── EditModal.jsx       # Edit post modal
├── services/
│   └── api.js              # API configuration
├── hooks/
│   └── usePosts.js         # React Query hooks
├── utils/
│   └── localStorage.js     # Local storage helpers
├── App.jsx                 # Main application
└── main.jsx                # Application entry point
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
