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
  Tab,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
/* components */
import PostContainer from "../components/PostContainer";

// axios - 쿠키 허용 전역 설정
axios.defaults.withCredentials = true;

// 내 정보 페이지 (내가 쓴 게시물 리스트 출력 페이지)
const MyInfo = () => {
  // 로그인 정보
  const loginInfo = useContext(LoginInfoContext);

  // 게시물 리스트 데이터
  const [postList, setPostList] = useState({ my: [], heart: [], temp: [] });

  // 전체 데이터 요청 함수
  const getPostList = async () => {
    await axios
      .all([
        axios.get(process.env.REACT_APP_DB_HOST + "/api/postList"),
        axios.get(process.env.REACT_APP_DB_HOST + "/api/heartPostList"),
        axios.get(process.env.REACT_APP_DB_HOST + "/api/temporaryPostList"),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          setPostList({
            // 모든 게시물 중에 자신이 작성한 게시물만 반환
            my: res1.data
              .reverse()
              .filter((post) => post.uid.id === loginInfo.id),
            heart: res2.data.reverse(),
            temp: res3.data.reverse(),
          });
        })
      )
      .catch((error) => {
        alert(error);
      });
  };

  // tabs value
  const [value, setValue] = useState("my");

  // tab 변경 이벤트 함수
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

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
          minWidth: "380px",
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

      <TabContext value={value}>
        <Box sx={{ width: "100%", px: 5 }}>
          <TabList
            onChange={handleTabChange}
            aria-label="lab API tabs example"
            sx={{ width: "100%" }}
            // textColor="secondary"
            // indicatorColor="secondary"
          >
            <Tab label="내 포스트" value="my" />
            <Tab label="좋아한 포스트" value="heart" />
            <Tab label="임시 포스트" value="temp" />
          </TabList>
        </Box>
        {/* {tabs.map((iter, index) => {
          return (
            <TabPanel
              key={iter}
              value={iter}
              sx={{ width: "100%", padding: 0 }}
            >
              {iter}
            </TabPanel>
          );
        })} */}
        <TabPanel value="my" sx={{ width: "100%", padding: 0 }}>
          <PostContainer postList={postList.my} />
        </TabPanel>
        <TabPanel value="heart" sx={{ width: "100%", padding: 0 }}>
          <PostContainer postList={postList.heart} />
        </TabPanel>
        <TabPanel value="temp" sx={{ width: "100%", padding: 0 }}>
          <PostContainer postList={postList.temp} postState="write" />
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default MyInfo;
