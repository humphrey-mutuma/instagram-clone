import { Avatar, Link } from "@material-ui/core";
import React, { useState } from "react";
import Followers from "./Followers";
import "./InstaEmbed.css";

const InstaEmbed = () => {
  // const [followers, setFollower] = useState([]);

  // const followers = [
  //   "photographer",
  //   "gambi55",
  //   "raymiesamie",
  //   "ashfordkarithi",
  //   "zachaeaus",
  // ];

  return (
    <section className="instaEmbed">
      <header >
        <div>
          <Avatar
            className="user__avatar"
            alt="Humphrey Mutuma"
            src="/static/images/avatar/1.jpg"
          />
        </div>
        <div>
          <p>
            <strong>humphrey.mutuma</strong>
          </p>
          <span>Humphrey Mutuma</span>
        </div>
        <div>
          <p>
            <Link>Switch</Link>
          </p>
        </div>
      </header>
      <p>Suggestions For You</p>
      <main>
        <Followers />
        <Followers />
        <Followers />
        <Followers />
        <Followers />
      </main>
      <footer>
        <span>
          <Link>About</Link>
        </span>
        <span>
          <Link>Help</Link>
        </span>
        <span>
          <Link>Press</Link>
        </span>
        <span>
          <Link>Privacy</Link>
        </span>
        <span>
          <Link>Terms</Link>
        </span>
        <span>
          <Link>Hashtags</Link>
        </span>
        <span>
          <Link>languages</Link>
        </span>
        <span>
          <Link>Jobs</Link>
        </span>
        <span>
          <Link>Location</Link>
        </span>
        <span>
          <Link>Top Accounts</Link>
        </span>
      </footer>

      <p>@ 2021 Instagram from facebook</p>
    </section>
  );
};

export default InstaEmbed;
