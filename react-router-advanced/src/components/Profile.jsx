import { Link, Routes, Route } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";

export default function Profile() {
  return (
    <div>
      <h1>👤 My Profile</h1>

      {/* Links to nested routes */}
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </nav>

      <hr />

      {/* Nested routing handled directly here */}
      <Routes>
        {/* Default when just /profile is visited */}
        <Route index element={<ProfileDetails />} />
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
}
