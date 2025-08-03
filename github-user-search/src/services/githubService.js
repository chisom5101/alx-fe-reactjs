// githubServices.js
const API_URL = 'https://api.github.com/search/users';

export const searchUsers = async (queryParams) => {
  const { username, location, minRepos, language } = queryParams;
  
  // Construct the query string based on provided parameters
  let query = '';
  
  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>${minRepos}`;
  if (language) query += ` language:${language}`;
  
  const response = await fetch(`${API_URL}?q=${encodeURIComponent(query.trim())}&per_page=20`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch users');
  }

  const data = await response.json();
  
  // Fetch additional details for each user (optional)
  const usersWithDetails = await Promise.all(
    data.items.map(async (user) => {
      const userDetails = await fetch(user.url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }).then(res => res.json());
      
      return {
        ...user,
        name: userDetails.name,
        location: userDetails.location,
        public_repos: userDetails.public_repos,
        followers: userDetails.followers,
        following: userDetails.following
      };
    })
  );

  return {
    ...data,
    items: usersWithDetails
  };
};
// Results.jsx
import { useState, useEffect } from 'react';

export default function Results({ data }) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (data) {
      setUsers(data.items);
      setPage(1);
    }
  }, [data]);

  const loadMore = async () => {
    if (!data || !data.items || isLoadingMore) return;
    
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const response = await searchUsers({
        ...queryParams,
        page: nextPage
      });
      
      setUsers(prev => [...prev, ...response.items]);
      setPage(nextPage);
    } catch (err) {
      console.error('Error loading more users:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (!users || users.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        No users found. Try adjusting your search criteria.
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  <a 
                    href={user.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600"
                  >
                    {user.login}
                  </a>
                </h3>
                {user.name && <p className="text-gray-600">{user.name}</p>}
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-700">
              {user.location && (
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {user.location}
                </p>
              )}
              
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Repositories: {user.public_repos || 0}
              </p>
              
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Followers: {user.followers || 0} • Following: {user.following || 0}
              </p>
            </div>
          </div>
        ))}
      </div>

      {data && data.total_count > users.length && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={isLoadingMore}
            className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}