import axios from "axios";

export const fetchAdvancedUserSearch = async (username, location, minRepos) => {
  let query = "";

  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}`;

  const response = await axios.get(url);

  // Return just the user list (items)
  return response.data.items;
};
