import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Confirm } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../Util/graphql";
function DeleteButton({ postId, callback, commentId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deleteMutation] = useMutation(mutation, {
    update() {
      setConfirmOpen(false);
      if (callback) callback();
    },
    onError(err) {
      console.log(err);
    },
    variables: { postId, commentId },
  });
  return (
    <>
      <div
        onClick={() => {
          setConfirmOpen(true);
        }}
        className="ui red button"
        style={{ float: "right" }}
      >
        <i style={{ margin: 0 }} className="trash icon"></i>
      </div>
      <Confirm
        open={confirmOpen}
        onConfirm={deleteMutation}
        onCancel={() => setConfirmOpen(false)}
      ></Confirm>
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      createdAt
      body
      username
    }
  }
`;

export default DeleteButton;
