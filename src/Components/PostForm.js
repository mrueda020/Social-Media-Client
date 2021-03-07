import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../Util/graphql";
function PostForm() {
  const [post, setPost] = useState({ body: "" });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: post,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      post.body = "";
    },
    onError(error) {
      console.log(error);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    createPost();
    setPost({ body: "" });
    window.location.reload();
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form className="ui form form-container" onSubmit={onSubmit}>
        <h2>Create a post</h2>
        <div className="field">
          <input
            type="text"
            onChange={handleChange}
            name="body"
            placeholder="Say Something!!!"
            value={post.body}
          />
        </div>
        <div className="field">
          <button disabled={post.body.trim() === ""} className="ui button red">
            Post
          </button>
        </div>
      </form>
      {error && (
        <div className="ui error message">
          <div className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </div>
        </div>
      )}
    </>
  );
}
const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;
export default PostForm;
