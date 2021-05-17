import { Avatar, Link } from "@material-ui/core";
import React from "react";
import './Followers.css'
const Followers = ({ follower }) => {
  return (
    <article className="follower">
      <div>
        <Avatar
          alt="Humphrey"
          src="/static/images/avatar/1.jpg"
        />
      </div>
      <div>
        <p>
          <strong> alexiseden</strong>
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
    </article>
  );
};

export default Followers;
