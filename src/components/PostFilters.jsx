import { motion } from 'framer-motion';

export default function PostFilters({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-card border border-gray-800 rounded-lg p-4 mb-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Search */}
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium mb-2 text-dark-yellow">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full px-3 py-2 pl-10 bg-dark-bg border border-gray-600 text-dark-yellow placeholder-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-codeleap-blue focus:border-codeleap-blue transition-all duration-300"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium mb-2 text-dark-yellow">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 bg-dark-bg border border-gray-600 text-dark-yellow rounded focus:outline-none focus:ring-2 focus:ring-codeleap-blue focus:border-codeleap-blue transition-all duration-300"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="most-liked">Most Liked</option>
            <option value="most-commented">Most Commented</option>
          </select>
        </div>

        {/* Filter By */}
        <div>
          <label className="block text-sm font-medium mb-2 text-dark-yellow">
            Filter By
          </label>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="w-full px-3 py-2 bg-dark-bg border border-gray-600 text-dark-yellow rounded focus:outline-none focus:ring-2 focus:ring-codeleap-blue focus:border-codeleap-blue transition-all duration-300"
          >
            <option value="all">All Posts</option>
            <option value="my-posts">My Posts</option>
            <option value="liked">Posts I Liked</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="flex items-end">
          <button
            onClick={() => {
              setSearchQuery('');
              setSortBy('newest');
              setFilterBy('all');
            }}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded font-semibold hover:bg-gray-600 transition-colors text-sm"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </motion.div>
  );
}
