import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../Context/auth";
function LikeButton({ post: { id, likeCount, likes } }) {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(err) {
      console.log(err);
    },
  });
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const likeButton = user ? (
    liked ? (
      <div className="ui  red button">
        <i className="heart icon"></i>
      </div>
    ) : (
      <div className="ui basic red button">
        <i className="heart icon"></i>
      </div>
    )
  ) : (
    <Link to="/login" className="ui basic red button">
      <i className="heart icon"></i>
    </Link>
  );
  return (
    <div className="ui labeled button" tabIndex="0" onClick={() => likePost()}>
      {likeButton}
      <a className="ui basic red left pointing label">{likeCount}</a>
    </div>
  );
}
const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
