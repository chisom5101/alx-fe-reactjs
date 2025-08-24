// src/App.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";

// A tiny demo component to prove React Query is wired up
function PostsComponent() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <ul>
      {data.slice(0, 5).map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 32 }}>
      <h1>Vite + React + React Query</h1>
      <PostsComponent />
    </div>
  );
}
