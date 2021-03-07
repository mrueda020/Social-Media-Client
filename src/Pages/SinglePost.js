import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Card, Form, Grid, Image } from "semantic-ui-react";
import LikeButton from "../Components/LikeButton";
import { AuthContext } from "../Context/auth";
import DeleteButton from "../Components/DeleteButton";
import moment from "moment";

function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  const [comment, setComment] = useState("");
  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment, { error }] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment("");
    },
    variables: {
      postId,
      body: comment,
    },
    onError(err) {
      console.log(error);
    },
  });

  let id, likeCount, likes, username, createdAt, body, commentCount, comments;
  if (!loading) {
    if (data) {
      id = data.getPost.id;
      likeCount = data.getPost.likeCount;
      likes = data.getPost.likes;
      username = data.getPost.username;
      createdAt = data.getPost.createdAt;
      body = data.getPost.body;
      commentCount = data.getPost.commentCount;
      comments = data.getPost.comments;
    } else {
      props.history.push("/");
    }
  }
  const callBack = () => {
    props.history.push("/");
  };

  return (
    <>
      {loading ? (
        <p>Loading post...</p>
      ) : data ? (
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src="https://semantic-ui.com/images/avatar2/large/matthew.png"></Image>
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{createdAt}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content>
                  <LikeButton post={{ id, likeCount, likes }}></LikeButton>
                  <div className="ui labeled button" tabIndex="0">
                    <div className="ui basic blue button">
                      <i className="comments icon"></i>
                    </div>
                    <a className="ui basic left pointing blue label">
                      {commentCount}
                    </a>
                  </div>
                  {user && user.username === username && (
                    <DeleteButton
                      postId={id}
                      callback={callBack}
                    ></DeleteButton>
                  )}
                </Card.Content>
              </Card>
              {user && (
                <Card fluid>
                  <Card.Content>
                    <p className="text-title">Post a Comment</p>
                    <Form>
                      <div className="ui action input fluid">
                        <input
                          type="text"
                          placeholder="Comment ...."
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                          className="ui button red"
                          disabled={comment.trim() === ""}
                          onClick={() => {
                            submitComment();
                            setTimeout(() => {
                              window.location.reload();
                            }, 200);
                          }}
                        >
                          Comment
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}
              {comments &&
                comments.map((comment) => {
                  return (
                    <Card fluid key={comment.id}>
                      <Card.Content>
                        {user && user.username === comment.username && (
                          <DeleteButton
                            postId={id}
                            commentId={comment.id}
                            callback={() => window.location.reload()}
                          />
                        )}
                        <Card.Header>{comment.username}</Card.Header>
                        <Card.Meta>
                          {moment(comment.createdAt).fromNow()}
                        </Card.Meta>
                        <Card.Description>{comment.body}</Card.Description>
                      </Card.Content>
                    </Card>
                  );
                })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <p>Post not found!!!</p>
      )}
    </>
  );
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      createdAt
      username
      body
    }
  }
`;

export default SinglePost;
