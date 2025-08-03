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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);
    setPage(1);

    try {
      const results = await fetchAdvancedUserSearch(searchParams, 1);
      setUsers(results);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users. Please try different search criteria.");
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
    } catch (err) {
      console.error(err);
      setError("Failed to load more users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Advanced GitHub User Search</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={searchParams.username}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. octocat"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={searchParams.location}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. San Francisco"
            />
          </div>

          <div>
            <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-1">
              Min Repositories
            </label>
            <input
              type="number"
              id="minRepos"
              name="minRepos"
              value={searchParams.minRepos}
              onChange={handleInputChange}
              min="0"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 10"
            />
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={searchParams.language}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. JavaScript"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search Users"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mt-8">
        {users.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Found {users.length} user{users.length !== 1 ? "s" : ""}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {users.map((user) => (
                <div key={user.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-lg">
                        <a
                          href={user.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {user.login}
                        </a>
                      </h4>
                      {user.name && <p className="text-gray-700">{user.name}</p>}
                      {user.location && (
                        <p className="text-gray-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {user.location}
                        </p>
                      )}
                      <div className="flex space-x-4 mt-1">
                        <span className="text-sm text-gray-600">
                          <strong>{user.public_repos}</strong> repos
                        </span>
                        <span className="text-sm text-gray-600">
                          <strong>{user.followers}</strong> followers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={loadMore}
              disabled={loading}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;