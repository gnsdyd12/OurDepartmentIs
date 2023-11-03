import React, { useState, useEffect, useContext } from "react";
/* useContext */
import { LoginInfoContext } from "../App";
/* axios */
import axios from "axios";
/* mui/material */
import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
/* components */
import PostContainer from "../components/PostContainer";

// axios - 쿠키 허용 전역 설정
axios.defaults.withCredentials = true;

// 내 정보 페이지 (내가 쓴 게시물 리스트 출력 페이지)
const MyInfo = () => {
  // 로그인 정보
  const loginInfo = useContext(LoginInfoContext);

  // 게시물 리스트 데이터
  const [postList, setPostList] = useState([]);

  // 전체 데이터 요청 함수
  const getPostList = async () => {
    await axios
      .get(process.env.REACT_APP_DB_HOST + "/api/postList")
      .then((response) => {
        setPostList(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  // 모든 게시물 중에 자신이 작성한 게시물만 반환하는 함수
  const filtered = postList.filter((post) => post.uid.id === loginInfo.id);

  // Mount
  useEffect(() => {
    getPostList();
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 내 정보 */}
      <Card
        sx={{
          display: "flex",
          width: "50%",
          my: 8,
          boxShadow: 0,
          borderRadius: 0,
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        {/* 프로필 사진 */}
        <CardMedia
          component="img"
          image={loginInfo.picture}
          sx={{ m: 2, width: 150, borderRadius: 20 }}
          alt="profile image"
        />

        {/* Text Box */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent
            sx={{
              flex: "1 0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* 이름 */}
            <Typography variant="h5" sx={{ my: 1 }}>
              {loginInfo.name}
            </Typography>

            {/* 이메일 */}
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ my: 1 }}
            >
              {loginInfo.email}
            </Typography>
          </CardContent>
        </Box>
      </Card>

      {/* 게시물 Container */}
      <PostContainer postList={filtered} />
    </Container>
  );
};

export default MyInfo;
