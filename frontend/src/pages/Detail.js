import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
/* CSS */
import styles from "../Detail.module.css";
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
  IconButton,
  useMediaQuery,
  Divider,
} from "@mui/material";
/* mui/icons-material */
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
/* utils */
import { API_BASE_URL } from "../utils/URL";
import { getFullDate } from "../utils/date";

// 쿠키 허용 (https://inpa.tistory.com/entry/AXIOS-📚-CORS-쿠키-전송withCredentials-옵션)
axios.defaults.withCredentials = true;

// 게시물 자세히 보기 페이지
const Detail = () => {
  // mediaQuery: 해상도에 따른 좋아요 버튼 출력 위치 지정
  const PC_SIZE = useMediaQuery("(min-width: 1024px)");
  const Mobile_SIZE = useMediaQuery("(max-width: 767px)");

  // PC_SIZE 일 때 렌더링 되는 좋아요 버튼
  const LeftHeartBtn = () => {
    return (
      <Box
        sx={{
          position: "sticky",
          height: "0", // height 지정을 해주지 않으면 끝까지 늘어남
          top: "20%",
          border: "1px solid",
          borderRadius: 8,
          py: "14px",
          px: "4px",
        }}
      >
        <IconButton
          sx={{ border: "solid 1px", mb: "8px" }}
          onClick={() => heartBtnClickEvent()}
          disabled={loginInfo ? false : true}
        >
          {isHeart ? (
            <FavoriteIcon sx={{ fontSize: "2rem" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: "2rem" }} />
          )}
        </IconButton>
        <Typography textAlign="center">{heartCount}</Typography>
      </Box>
    );
  };

  // PC_SIZE 아닐 때 렌더링 되는 좋아요 버튼
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
        {isHeart ? (
          <FavoriteIcon sx={{ fontSize: "small" }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: "small" }} />
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

  // 게시물 정보
  const [post, setPost] = useState({
    id: 0,
    title: "",
    contents: "",
    writer: "",
    views: 0,
    heartCount: 0,
    createTime: "",
    uid: {
      id: 0,
    },
  });

  // 좋아요 여부
  const [isHeart, setIsHeart] = useState(false);

  // 좋아요 총 개수
  const [heartCount, setHeartCount] = useState(0);

  // API 통신 완료 여부. true 일 때 화면에 출력
  const [completeGetPost, setCompleteGetPost] = useState(false);

  // 게시물 데이터 요청 함수
  const getPost = async () => {
    axios
      .post(process.env.REACT_APP_DB_HOST + `/api/view_post/${id}`)
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
      .post(process.env.REACT_APP_DB_HOST + "/api/is_heart", {
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
      .post(process.env.REACT_APP_DB_HOST + "/api/heart_click", {
        pid: id,
        uid: loginInfo.id,
      })
      .then(function (response) {
        setIsHeart(response.data);

        response.data
          ? setHeartCount(heartCount + 1)
          : setHeartCount(heartCount - 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Mount
  useEffect(() => {
    getPost();
    loginInfo && getIsHeart();
  }, []); // 발생하는 경고문 useCallback으로 해결 필요

  return (
    <Container
      sx={{ display: "flex", width: Mobile_SIZE ? "100%" : "80%", my: 5 }}
    >
      {/* 좋아요 버튼 */}
      {PC_SIZE && <LeftHeartBtn />}

      {/* 게시물 */}
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* 제목 */}
        <Typography variant="h2" sx={{ mb: 2 }}>
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
          {!PC_SIZE && <RightHeartBtn />}
        </Box>
        <Divider sx={{ mb: 2 }} />

        {/* 내용 */}
        {completeGetPost && <Viewer initialValue={post.contents} />}

        {/* 수정, 삭제 버튼 Stack */}
        {loginInfo && loginInfo.id === post.uid.id && (
          <Stack
            spacing={2}
            direction="row"
            justifyContent="flex-end"
            sx={{ mt: 6 }}
          >
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

export default Detail;
