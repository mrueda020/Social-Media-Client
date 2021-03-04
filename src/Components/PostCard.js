import React from "react";
import { Link } from "react-router-dom";
function PostCard(props) {
  console.log(props);
  const {
    post: { body, createdAt, id, username, likeCount, commentCount },
  } = props;
  return (
    <div className=" ui card fluid">
      <img
        style={{ width: "100vw" }}
        className="ui mini image"
        src="https://semantic-ui.com/images/avatar2/large/matthew.png"
      />

      <div className="content">
        <div className="header">{username}</div>
        <div className="meta">
          <Link to={`/posts/${id}`}>{createdAt}</Link>
        </div>
        <div className="description">{body}</div>
      </div>
      <div
        style={{ display: "flex", alignItems: "center" }}
        className="extra  content"
      >
        <div className="ui labeled  button" tabIndex="0">
          <div className="ui basic red button">
            <i className="heart icon"></i>
          </div>
          <a className="ui basic red left pointing label">{likeCount}</a>
        </div>
        <div className="ui labeled  button" tabIndex="0">
          <div className="ui basic blue button">
            <i className="comments icon"></i>
          </div>
          <a className="ui basic left pointing blue label">{commentCount}</a>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
