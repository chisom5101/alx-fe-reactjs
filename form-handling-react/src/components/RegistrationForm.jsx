import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(""); // 👈 renamed

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (separate if checks)
    if (!username) {
      setErrors("⚠ Username is required");
      return;
    }

    if (!email) {
      setErrors("⚠ Email is required");
      return;
    }

    if (!password) {
      setErrors("⚠ Password is required");
      return;
    }

    // Extended validation
    if (username.length < 3) {
      setErrors("⚠ Username must be at least 3 characters long.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrors("⚠ Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setErrors("⚠ Password must be at least 6 characters long.");
      return;
    }

    // If everything is valid
    setErrors("");
    console.log("✅ Form Submitted:", { username, email, password });

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-4 max-w-sm mx-auto border rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">User Registration</h2>

      {errors && <p className="text-red-500 mb-2">{errors}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block font-medium mb-1">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

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
