import React, { useState } from "react";
import { fetchAdvancedUserSearch } from "../services/githubService";

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: "",
    location: "",
    minRepos: "",
    language: "",
    followers: ""
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchParams.username.trim()) {
      setError("Username is required");
      return;
    }

    setLoading(true);
    setError("");
    setUsers([]);
    setPage(1);

    try {
      const results = await fetchAdvancedUserSearch(searchParams, 1);
      setUsers(results);
      setHasMore(results.length === 10); // Assuming 10 items per page
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch users. Please try different search criteria.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const results = await fetchAdvancedUserSearch(searchParams, nextPage);
      setUsers(prev => [...prev, ...results]);
      setPage(nextPage);
      setHasMore(results.length === 10);
    } catch (err) {
      console.error(err);
      setError("Failed to load more users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Advanced GitHub User Search</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={searchParams.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. octocat"
              required
            />
          </div>

          {/* Location Field */}
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={searchParams.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. San Francisco"
            />
          </div>

          {/* Min Repositories Field */}
          <div className="space-y-2">
            <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700">
              Minimum Repositories
            </label>
            <input
              type="number"
              id="minRepos"
              name="minRepos"
              value={searchParams.minRepos}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 10"
            />
          </div>

          {/* Language Field */}
          <div className="space-y-2">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">
              Primary Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={searchParams.language}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. JavaScript"
            />
          </div>

          {/* Followers Field */}
          <div className="space-y-2">
            <label htmlFor="followers" className="block text-sm font-medium text-gray-700">
              Minimum Followers
            </label>
            <input
              type="number"
              id="followers"
              name="followers"
              value={searchParams.followers}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 100"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : "Search Users"}
          </button>
        </div>
      </form>

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results Display */}
      <div className="mt-8">
        {users.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Found {users.length} user{users.length !== 1 ? "s" : ""}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {users.map((user) => (
                <div key={user.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img className="h-16 w-16 rounded-full" src={user.avatar_url} alt={user.login} />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">
                            {user.login}
                          </a>
                        </h4>
                        {user.name && <p className="text-sm text-gray-500">{user.name}</p>}
                        
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          {user.location && (
                            <div className="flex items-center text-sm text-gray-500">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              {user.location}
                            </div>
                          )}
                          
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            {user.public_repos || 0} repos
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                            </svg>
                            {user.followers || 0} followers
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {user.following || 0} following
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {hasMore && (
              <div className="flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-6 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;