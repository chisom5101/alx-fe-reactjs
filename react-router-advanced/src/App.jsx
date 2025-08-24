import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Profile from "./pages/Profile.jsx";
import ProfileDetails from "./pages/ProfileDetails.jsx";
import ProfileSettings from "./pages/ProfileSettings.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  // Are we logged in? (false = not logged in)
  const [isAuthed, setIsAuthed] = useState(false);

  return (
    <BrowserRouter>
      {/* Simple top menu */}
      <nav style={{ display: "flex", gap: 12, padding: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/profile">Profile</Link>
        {!isAuthed ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={() => setIsAuthed(false)}>Log out</button>
        )}
      </nav>

      <Routes>
        {/* Normal rooms */}
        <Route path="/" element={<Home />} />
        <Route path="blog" element={<Blog />} />
        {/* Magic room name (dynamic) */}
        <Route path="blog/:id" element={<BlogPost />} />

        {/* Rooms with a bouncer */}
        <Route element={<ProtectedRoute isAuthed={isAuthed} />}>
          {/* Profile is a room that has its own rooms (nested) */}
          <Route path="profile" element={<Profile />}>
            <Route index element={<ProfileDetails />} />
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
        </Route>

        {/* Login + 404 */}
        <Route
          path="login"
          element={
            <Login onLogin={() => setIsAuthed(true)} isAuthed={isAuthed} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
