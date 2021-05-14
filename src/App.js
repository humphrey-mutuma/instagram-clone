import { useState } from "react";
import "./App.css";
import Post from "./components/Post";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "@humphrey",
      caption: "This IG build is just amazing",
      imageUrl: "https://reactjs.org/logo-og.png",
    },
    {
      username: "@mutuma",
      caption: "Sick builds only.",
      imageUrl: "https://reactjs.org/logo-og.png",
    },
  ]);

  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
          alt="instagram logo"
        />
      </div>

      <h1> Instagram clone. this is gonna be a sick & sleek build</h1>

    {
      posts.map((post) =>(
        <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ))
    }
    </div>
  );
}

export default App;
