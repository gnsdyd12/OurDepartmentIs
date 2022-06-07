import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginInfoContext } from "../App";
import axios from "axios";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import {
  Container,
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { basicColor } from "../color";
import { API_BASE_URL } from "../URL";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { createTheme } from "@mui/system";
import { ThemeProvider } from "@emotion/react";

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
  // 게시글의 id 값을 url로부터 저장
  const { id } = useParams();

  const [post, setPost] = useState({
    id: 0,
    title: "",
    contents: "",
    writer: "",
    views: 0,
  });

  // API 수신을 완료했는지 판단하는 변수. 이 변수가 true로 바뀌고 난 후 화면에 출력
  const [completeGetPost, setCompleteGetPost] = useState(false);

  // 로그인 정보
  const loginInfo = useContext(LoginInfoContext);

  useEffect(() => {
    axios
      .post(`/api/view_post/${id}`)
      .then((response) => {
        setPost(response.data);
        setCompleteGetPost(true);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const heartButtonActive = useMediaQuery("(min-width: 1440px)");

  // 좋아요 상태를 관리할 변수
  const [isHeart, setIsHeart] = useState(false);

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
            onClick={() => setIsHeart(!isHeart)}
          >
            {isHeart === false ? (
              <FavoriteBorderIcon sx={{ fontSize: "2rem" }} />
            ) : (
              <FavoriteIcon sx={{ fontSize: "2rem" }} />
            )}
          </IconButton>
          <Typography textAlign="center">100</Typography>
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

        {/* 수정, 삭제 */}
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
