import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Post from "./Post";

const PostContainer = () => {
  const [postList, setPostList] = useState([]);
  // post: id(int), title(string), contents(string), writer(string)

  useEffect(() => {
    axios
      .get("/api/postList")
      .then((response) => {
        setPostList(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", justifyContent: "center", my: 6 }}
    >
      <Grid container spacing={4} sx={{ width: "100%" }}>
        {postList.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Grid>
    </Container>
  );
};

export default PostContainer;
