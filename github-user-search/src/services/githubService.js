const API_BASE_URL = "https://api.github.com";

/**
 * Fetches basic data for a single GitHub user
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} User data object
 */
export const fetchUserData = async (username) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${username}`);
    
    if (!response.ok) {
      throw new Error(`User not found: ${username}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

/**
 * Performs an advanced search for GitHub users with multiple filters
 * @param {string} username - Username to search
 * @param {string} location - Location filter
 * @param {number} minRepos - Minimum repositories filter
 * @returns {Promise<Array>} Array of user objects
 */
export const fetchAdvancedUserSearch = async (username, location, minRepos) => {
  // Construct the query string
  let query = `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>${minRepos}`;

  try {
    const response = await fetch(
      `${API_BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=10`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to search users');
    }

    const data = await response.json();
    
    // If no results found
    if (!data.items || data.items.length === 0) {
      return [];
    }

    // Fetch detailed information for each user
    const detailedUsers = await Promise.all(
      data.items.map(user => fetchUserData(user.login))
    );

    return detailedUsers;
  } catch (error) {
    console.error('Error in advanced search:', error);
    throw error;
  }
};