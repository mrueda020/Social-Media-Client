import React from "react";
import moment from "moment";
import LikeButton from "../Components/LikeButton";
function PostCard({
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
        <div className="meta"> {moment(createdAt).fromNow(true)}</div>
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

        <div className="ui red button" style={{ float: "right" }}>
          <i style={{ margin: 0 }} className="trash icon"></i>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
