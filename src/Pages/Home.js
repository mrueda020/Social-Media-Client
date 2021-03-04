import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PostCard from "../Components/PostCard";
import { Grid } from "semantic-ui-react";

function Home() {
  const { data, loading } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div>
      <h2 className="ui center text-title">Recent Posts</h2>
      <Grid stackable columns={3}>
        {loading ? (
          <h1>Loading posts....</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => {
            return (
              <div key={post.id} className="column">
                <PostCard post={post}></PostCard>
              </div>
            );
          })
        )}
      </Grid>
    </div>
  );
}
const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
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
        createdAt
        body
      }
    }
  }
`;

export default Home;
