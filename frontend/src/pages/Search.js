import React, { useState, useEffect } from "react";

/* axios */
import axios from "axios";

/* mui/material */
import {
  Container,
  FormControl,
  TextField,
  Grid,
  Box,
  Typography,
} from "@mui/material";

/* components */
import Post from "../components/Post";

const Search = () => {
  // 검색 content mapping 할 state
  const [searchContent, setSearchContent] = useState("");

  // 게시물 리스트 관리 객체
  const [postList, setPostList] = useState([]);

  // 전체 게시물 데이터 요청 함수
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

  // 검색 내용으로 게시물을 거르는 함수
  const filtered = postList.filter(
    (itemList) =>
      itemList.title.toUpperCase().includes(searchContent.toUpperCase()) ||
      itemList.contents.toUpperCase().includes(searchContent.toUpperCase())
  );

  // Mount
  useEffect(() => {
    getAllPostList();
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* 검색 창 */}
      <Box sx={{ width: 800, m: 5 }}>
        <TextField
          id="demo-helper-text-misaligned-no-helper"
          label="Search"
          fullWidth
          value={searchContent}
          onChange={(e) => setSearchContent(e.target.value)}
        />
        {filtered.length === 0 && (
          <Typography sx={{ mt: 2 }}>검색 결과가 없습니다.</Typography>
        )}
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={4} sx={{ width: "100%" }}>
          {searchContent !== "" &&
            filtered.map((post) => <Post key={post.id} post={post} />)}
        </Grid>
      </Container>
    </Container>
  );
};

export default Search;
