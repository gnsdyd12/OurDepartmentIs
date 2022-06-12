import React, { useEffect, useState } from "react";

/* axios */
import axios from "axios";

/* mui/material */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

/* components */
import Post from "./Post";

const PostContainer = ({ postState }) => {
  // 게시물 리스트 관리 객체
  const [postList, setPostList] = useState([]);

  // 전체 게시물 데이터 요청 함수
  const getAllPostList = async () => {
    await axios
      .get(process.env.REACT_APP_DB_HOST + "/api/postList")
      .then((response) => {
        setPostList(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  // 임시 저장 게시물 데이터 요청 함수
  const getTemporaryPostList = async () => {
    await axios
      .get(process.env.REACT_APP_DB_HOST + "/api/temporaryPostList")
      .then((response) => {
        setPostList(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  // 좋아요 게시물 데이터 요청 함수
  const getHeartPostList = async () => {
    await axios
      .get(process.env.REACT_APP_DB_HOST + "/api/heartPostList")
      .then((response) => {
        setPostList(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  // Mount
  useEffect(() => {
    console.log(process.env.REACT_APP_DB_HOST);
    postState === "All"
      ? getAllPostList()
      : postState === "Temporary"
      ? getTemporaryPostList()
      : getHeartPostList();
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

axios.defaults.withCredentials = true;

export default PostContainer;
