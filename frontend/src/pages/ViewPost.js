import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

/* CSS */
import styles from "../App.module.css";

/* useContext */
import { LoginInfoContext } from "../App";

/* axios */
import axios from "axios";

/* toast-ui-viewer */
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

/* mui/material */
import {
  Container,
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  useMediaQuery,
  Divider,
} from "@mui/material";

/* mui/icons-material */
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

/* mui/system */
import { createTheme } from "@mui/system";

/* utils */
import { API_BASE_URL } from "../utils/URL";
import { getFullDate } from "../utils/date";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

const ViewPost = () => {
  // mediaQuery: 해상도에 따른 좋아요 버튼 출력 위치 지정
  const heartBtnPosition = useMediaQuery("(min-width: 1200px)");

  // heartBtnPosition 일 때 좋아요 버튼
  const LeftHeartBtn = () => {
    return (
      <Box
        sx={{
          position: "fixed",
          top: "20%",
          border: "1px solid",
          borderRadius: 8,
          py: "14px",
          px: "4px",
          ml: "0px",
        }}
      >
        <IconButton
          sx={{ border: "solid 1px" }}
          onClick={() => heartBtnClickEvent()}
          disabled={loginInfo ? false : true}
        >
          {isHeart === false ? (
            <FavoriteBorderIcon sx={{ fontSize: "2rem" }} />
          ) : (
            <FavoriteIcon sx={{ fontSize: "2rem" }} />
          )}
        </IconButton>
        <Typography textAlign="center">{heartCount}</Typography>
      </Box>
    );
  };

  // heartBtnPosition 아닐 때 좋아요 버튼
  const RightHeartBtn = () => {
    return (
      <IconButton
        onClick={() => heartBtnClickEvent()}
        disabled={loginInfo ? false : true}
        sx={{
          border: "1px solid",
          borderRadius: 8,
          px: "12px",
          py: "0px",
        }}
      >
        {isHeart === false ? (
          <FavoriteBorderIcon sx={{ fontSize: "small" }} />
        ) : (
          <FavoriteIcon sx={{ fontSize: "small" }} />
        )}
        <Typography variant="caption" textAlign="center">
          &nbsp;&nbsp;{heartCount}
        </Typography>
      </IconButton>
    );
  };

  // 로그인 정보
  const loginInfo = useContext(LoginInfoContext);

  // 게시물 id를 url로부터 저장
  const { id } = useParams();

  // 게시물 데이터 관리 객체
  const [post, setPost] = useState({
    id: 0,
    title: "",
    contents: "",
    writer: "",
    views: 0,
    heartCount: 0,
    createTime: "",
  });

  // 좋아요 상태 관리 객체
  const [isHeart, setIsHeart] = useState(false);

  // 좋아요 개수 관리 객체
  const [heartCount, setHeartCount] = useState(0);

  // API 수신을 완료했는지 판단하는 객체. 이 객체가 true로 바뀌면 화면에 출력
  const [completeGetPost, setCompleteGetPost] = useState(false);

  // 게시물 데이터 요청 함수
  const getPost = async () => {
    axios
      .post(`/api/view_post/${id}`)
      .then((response) => {
        setPost(response.data);
        console.log(response.data);
        setHeartCount(response.data.heartCount);
        setCompleteGetPost(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 좋아요 여부 데이터(boolean) 요청 함수
  const getIsHeart = async () => {
    axios
      .post("/api/is_heart", {
        pid: id,
        uid: loginInfo.id,
      })
      .then((response) => {
        setIsHeart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 좋아요 버튼이 눌렸을 때, backend로 postId와 userId 데이터를 전달하여 좋아요 상태값(boolean)을 반환받는 함수
  const heartBtnClickEvent = () => {
    axios
      .post("/api/heart_click", {
        pid: id,
        uid: loginInfo.id,
      })
      .then(function (response) {
        setIsHeart(response.data);
        {
          response.data === true
            ? setHeartCount(heartCount + 1)
            : setHeartCount(heartCount - 1);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Mount
  useEffect(() => {
    getPost();
    loginInfo && getIsHeart();
  }, []);

  return (
    <Container sx={{ display: "flex", maxWidth: "lg" }}>
      {/* 좋아요 버튼 */}
      {heartBtnPosition && <LeftHeartBtn />}

      {/* 게시물 */}
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          my: 4,
        }}
      >
        {/* 제목 */}
        <Typography variant="h2" sx={{ my: 2 }}>
          {post.title}
        </Typography>

        {/* 작성자, 작성일, 조회수, 좋아요 버튼 Box */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 2,
          }}
        >
          {/* 작성자, 작성일, 조회수 Stack */}
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            {/* 작성자 */}
            <Typography variant="caption">by {post.writer}</Typography>

            {/* 작성일 */}
            <Typography variant="caption">
              {getFullDate(post.createTime)}
            </Typography>

            {/* 조회수 */}
            <Typography variant="caption">조회수: {post.views}</Typography>
          </Stack>

          {/* 좋아요 버튼 */}
          {!heartBtnPosition && <RightHeartBtn />}
        </Box>
        <Divider sx={{ mb: 2 }} />

        {/* 내용 */}
        {completeGetPost && <Viewer initialValue={post.contents} />}

        {/* 수정, 삭제 버튼 Stack */}
        {loginInfo && loginInfo.name === post.writer && (
          <Stack spacing={2} direction="row" sx={{ mt: 6 }}>
            {/* 수정 버튼 */}
            <button
              className={styles.modifyBtn}
              onClick={() =>
                (window.location.href = API_BASE_URL + `/modify_post/${id}`)
              }
            >
              수정
            </button>

            {/* 삭제 버튼 */}
            <button
              className={styles.deleteBtn}
              onClick={() =>
                (window.location.href = API_BASE_URL + `/delete_post/${id}`)
              }
            >
              삭제
            </button>
          </Stack>
        )}
      </Container>
    </Container>
  );
};

export default ViewPost;
