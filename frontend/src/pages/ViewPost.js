import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import { Container, Typography, Box } from "@mui/material";

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

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          my: 6,
        }}
      >
        <Typography variant="h2" sx={{ mb: 2 }}>
          {post.title}
        </Typography>
        {completeGetPost && <Viewer initialValue={post.contents} />}
      </Container>
    </>
  );
};

export default ViewPost;
