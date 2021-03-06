import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import PostCard from "../Components/PostCard";
import { Grid } from "semantic-ui-react";
import PostForm from "../Components/PostForm";
import { FETCH_POSTS_QUERY } from "../Util/graphql";
import { AuthContext } from "../Context/auth";

function Home() {
  const { data, loading } = useQuery(FETCH_POSTS_QUERY);

  const { user } = useContext(AuthContext);
  return (
    <div>
      <h2 className="ui center text-title">Recent Posts</h2>
      <Grid stackable columns={3}>
        {user && (
          <div className="column">
            <PostForm></PostForm>
          </div>
        )}
        {loading ? (
          <h1>Loading posts....</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => {
            return (
              <div key={post.id} className="column">
                <PostCard user={user} post={post}></PostCard>
              </div>
            );
          })
        )}
      </Grid>
    </div>
  );
}

export default Home;
