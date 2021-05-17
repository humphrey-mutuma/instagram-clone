import { useEffect, useState } from "react";
import "./App.css";
import Post from "./components/Post";
import { auth, db } from "../src/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./components/ImageUpload";
// import InstagramEmbed from "react-instagram-embed";
import { IconButton } from "@material-ui/core";
import InstaEmbed from "./components/InstaEmbed";
import HomeIcon from "@material-ui/icons/Home";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import MenuPopupState from "./components/Menu";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //logged in ..
        console.log(authUser);
        setUser(authUser);
      } else {
        //logged out
        setUser(null);
      }
    });
    return () => {
      //cleanup effect
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        )
      );
  }, []);

  const signUp = (event) => {
    // This is to prevent the page from refreshing when we submit the form
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    // Set user so that footer changes accordingly

    // Close modal
    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    // Close modal
    setOpenSignIn(false);
  };

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
                alt="instagram logo"
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
                alt="instagram logo"
              />
            </center>
            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      <header className="app__header">
        <nav className="app_nav">
          <img
            className="app__headerImage"
            src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
            alt="instagram logo"
          />

          <div className="search">
            <div className="searchIcon">
              <SearchIcon />
            </div>
            <InputBase placeholder="Search…" />
          </div>

          <div className="nav__icons">
            <IconButton>
              <HomeIcon />
            </IconButton>
            <IconButton>
              <NearMeOutlinedIcon />
            </IconButton>
            <IconButton>
              <ExploreOutlinedIcon />
            </IconButton>
            <IconButton>
              <FavoriteBorderOutlinedIcon />
            </IconButton>
          </div>
          <div className="nav_buttons">
            {user ? (
              <Button onClick={() => auth.signOut()}>Logout</Button>
            ) : (
              <div className="app__loginContainer">
                <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                <Button onClick={() => setOpen(true)}>Sign Up</Button>
              </div>
            )}
          </div>
          <IconButton className="toggleButton">
            <MenuPopupState />
          </IconButton>
        </nav>
      </header>

      <div className="app_posts">
        <div className="app_postsLeft">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>

        <div className="app_postsRight">
          <aside className="aside">
            <InstaEmbed />
          </aside>
        </div>
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Login to upload</h3>
      )}
    </div>
  );
}

export default App;
