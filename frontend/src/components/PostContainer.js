import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Post from "./Post";
import Box from "@mui/material/Box";

const PostContainer = () => {
  const [postList, setPostList] = useState([]);
  // int: id / string: title, contents, writer

  useEffect(() => {
    axios.post("/api/postList").then((response) => {
      if (response.data) {
        setPostList(response.data);
        // console.log(response.data);
      } else {
        alert("failed");
      }
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
