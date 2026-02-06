import { useState, useMemo, useEffect } from 'react';
import { getUsername } from '../utils/localStorage';
import { getLikeCount, hasUserLiked } from '../utils/likes';
import { getCommentCount } from '../utils/comments';

export default function usePostFilters(posts) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredAndSortedPosts = useMemo(() => {
    if (!posts) return [];

    const username = getUsername();
    let filtered = [...posts];

    // Apply search filter
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.username.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filterBy === 'my-posts') {
      filtered = filtered.filter((post) => post.username === username);
    } else if (filterBy === 'liked') {
      filtered = filtered.filter((post) => hasUserLiked(post.id, username));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_datetime) - new Date(a.created_datetime);
        case 'oldest':
          return new Date(a.created_datetime) - new Date(b.created_datetime);
        case 'most-liked':
          return getLikeCount(b.id) - getLikeCount(a.id);
        case 'most-commented':
          return getCommentCount(b.id) - getCommentCount(a.id);
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, debouncedSearch, sortBy, filterBy]);

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
    filteredPosts: filteredAndSortedPosts,
  };
}
