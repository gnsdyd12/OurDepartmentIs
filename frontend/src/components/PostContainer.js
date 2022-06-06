import React, { useEffect, useState, useContext } from "react";
import { PostListContext } from "../App";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Post from "./Post";

const PostContainer = ({ postState }) => {
  // 게시물 리스트 정보
  const [postList, setPostList] = useState([]);
  // post: id(int), title(string), contents(string), writer(string)

  // 전체 게시물 데이터 요청, 수신
  const getAllPostList = async () => {
    await axios
      .get("/api/postList")
      .then((response) => {
        setPostList(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  // 임시 저장 게시물 데이터 요청, 수신
  const getTemporaryPostList = async () => {
    await axios
      .get("/api/temporaryPostList")
      .then((response) => {
        setPostList(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    postState === "All" ? getAllPostList() : getTemporaryPostList();
  }, []);

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

PostContainer.defaultProps = {
  postState: "All",
};

export default PostContainer;
