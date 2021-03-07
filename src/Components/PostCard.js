import React, { useContext } from "react";
import moment from "moment";
import LikeButton from "../Components/LikeButton";

import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";
function PostCard({
  user,
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  return (
    <div className="ui card  " style={{ width: "400px" }}>
      <div className="content">
        <img
          className="right floated mini ui image"
          src="https://semantic-ui.com/images/avatar2/large/matthew.png"
        />
        <div className="header">{username}</div>
        <Link to={`/posts/${id}`} className="meta">
          {moment(createdAt).fromNow(true)}
        </Link>
        <div className="description">{body}</div>
      </div>
      <div className="extra content ">
        <LikeButton post={{ id, likes, likeCount }}></LikeButton>
        <div className="ui labeled button" tabIndex="0">
          <div className="ui basic blue button">
            <i className="comments icon"></i>
          </div>
          <a className="ui basic left pointing blue label">{commentCount}</a>
        </div>

        {user && user.username === username && (
          <DeleteButton
            postId={id}
            callback={() => window.location.reload()}
          ></DeleteButton>
        )}
      </div>
    </div>
  );
}

export default PostCard;
