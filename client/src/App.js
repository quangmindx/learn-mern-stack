import React from "react";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import "./App.css";
import data from "./data";

// create post
function createPosts(posts) {
  return posts.map((post) => {
    return (
      <Post
        key={post.id}
        imageUrl={post.imageUrl}
        username={post.username}
        caption={post.caption}
        photo={post.photo}
      />
    );
  });
}

function App() {
  return (
    <div className="app">
      <Navbar />
      {createPosts(data)}
    </div>
  );
}

export default App;
