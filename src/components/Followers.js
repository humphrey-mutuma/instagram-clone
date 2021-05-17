import { Avatar, Link } from "@material-ui/core";
import React from "react";
import "./Followers.css";
const Followers = ({ username }) => {
  return (
    <article className="follower">
      <div className="followerLeft">
        <Avatar alt={username} src="/static/images/avatar/1.jpg" />
      </div>
      <div className="followerRight">
        <div>
          <p>
            <strong> {username}</strong>
          </p>
          <span>Follows you</span>
        </div>
        <div>
          <p>
            <strong>
              <Link>Follow</Link>
            </strong>
          </p>
        </div>
      </div>
    </article>
  );
};

export default Followers;
