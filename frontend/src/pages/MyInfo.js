import React, { useState, useEffect, useContext } from "react";

/* useContext */
import { LoginInfoContext } from "../App";

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
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";

/* components */
import Post from "../components/Post";

const MyInfo = () => {
  // 로그인 정보
  const loginInfo = useContext(LoginInfoContext);

  // 게시물 리스트 관리 객체
  const [postList, setPostList] = useState([]);

  // 나의 게시물 데이터 요청 함수
  const getMyPostList = async () => {
    await axios
      .get("/api/myPostList")
      .then((response) => {
        setPostList(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  // Mount
  //   useEffect(() => {
  //     getMyPostList();
  //   }, []);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* 내 정보 */}
        <Card
          sx={{
            display: "flex",
            width: "50%",
            m: 5,
            boxShadow: 5,
          }}
        >
          {/* 프로필 사진 */}
          <CardMedia
            component="img"
            image={loginInfo.picture}
            sx={{ m: 2, width: 150, borderRadius: 20 }}
            alt="Live from space album cover"
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
        <Divider />

        {/* 게시물 Container */}
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Divider />
          <Grid container spacing={4} sx={{ width: "100%" }}>
            {postList.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default MyInfo;
