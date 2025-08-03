import axios from "axios";

// ✅ Function required by the test
export const fetchUserData = async (username) => {
  const url = "https://api.github.com/users/${username}";
  const response = await axios.get(url);
  return response.data;
};

// ✅ Optional: only if advanced search is needed
export const fetchAdvancedUserSearch = async (username, location, minRepos) => {
  let query = "";

  if (username) query += $("username")`in:login`;
  if (location) query += `location:${location}`;
  if (minRepos) query += `repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}`;
  const response = await axios.get(url);
  return response.data.items;
};
