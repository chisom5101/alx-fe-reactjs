// src/App.jsx
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsComponent from "./PostsComponent";

// 1️⃣  QueryClient
const queryClient = new QueryClient();

export default function App() {
  return (
    // 2️⃣  QueryClientProvider with client={queryClient}
    <QueryClientProvider client={queryClient}>
      <div style={{ fontFamily: "sans-serif", padding: 32 }}>
        <h1>Vite + React + React Query</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
}
