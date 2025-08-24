import { useState } from "react";

export default function RegistrationForm() {
  // State for inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for errors
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation rules
    if (!username || !email || !password) {
      setError("⚠ All fields are required!");
      return;
    }

    if (username.length < 3) {
      setError("⚠ Username must be at least 3 characters long.");
      return;
    }

    // Simple email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("⚠ Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("⚠ Password must be at least 6 characters long.");
      return;
    }

    // If validation passes
    setError("");
    console.log("✅ Form Submitted:", { username, email, password });

    // Clear form
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-4 max-w-sm mx-auto border rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">User Registration</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
