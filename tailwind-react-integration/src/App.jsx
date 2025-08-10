import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <UserProfile />
    </div>
  );
}

export default App;
