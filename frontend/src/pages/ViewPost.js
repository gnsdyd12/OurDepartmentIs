import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

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
} from "@mui/material";

/* mui/icons-material */
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

/* mui/system */
import { createTheme } from "@mui/system";

/* utils */
import { API_BASE_URL } from "../utils/URL";

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
  // mediaQuery: 1440px 이상일 때만 좋아요 버튼 출력
  const heartButtonActive = useMediaQuery("(min-width: 1440px)");

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
    <>
      {/* 좋아요 버튼 */}
      {heartButtonActive && (
        <Box
          sx={{
            position: "fixed",
            top: "20%",
            left: "10%",
            border: "1px solid",
            borderRadius: 8,
            py: "14px",
            px: "4px",
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
      )}

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          my: 6,
        }}
      >
        {/* 제목 */}
        <Typography variant="h2" sx={{ mb: 2 }}>
          {post.title}
        </Typography>

        {/* 내용 */}
        {completeGetPost && <Viewer initialValue={post.contents} />}

        {/* 수정, 삭제 버튼 */}
        {loginInfo && loginInfo.name === post.writer && (
          <Stack spacing={2} direction="row" sx={{ mt: 6 }}>
            <Button
              variant="outlined"
              onClick={() =>
                (window.location.href = API_BASE_URL + `/modify_post/${id}`)
              }
            >
              수정
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                (window.location.href = API_BASE_URL + `/delete_post/${id}`)
              }
            >
              삭제
            </Button>
          </Stack>
        )}
      </Container>
    </>
  );
};

export default ViewPost;
