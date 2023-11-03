import React from "react";
/* axios */
import axios from "axios";
/* mui/material */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
/* components */
import Post from "./Post";

const PostContainer = ({ postList, postState }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", justifyContent: "center", my: 6 }}
    >
      <Grid container spacing={4} sx={{ width: "100%" }}>
        {postList.map((post) => (
          <Post key={post.id} post={post} postState={postState} />
        ))}
      </Grid>
    </Container>
  );
};

// postState는 write(임시저장 글 이어쓰기)와 read(작성 완료된 글 읽기) 두 가지 상태로 있음
PostContainer.defaultProps = {
  postState: "read",
};

export default PostContainer;
