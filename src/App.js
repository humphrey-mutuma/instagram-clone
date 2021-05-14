import { useEffect, useState } from "react";
import "./App.css";
import Post from "./components/Post";
import { db } from "../src/firebase";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      )
    );
    // return () => {
    //   cleanup;
    // };
  }, []);

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

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
