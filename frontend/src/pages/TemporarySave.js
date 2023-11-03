import React, { useEffect, useState } from "react";
/* axios */
import axios from "axios";
/* components */
import PostContainer from "../components/PostContainer";

// axios - 쿠키 허용 전역 설정
axios.defaults.withCredentials = true;

// 임시저장 게시물 리스트 출력 페이지
const TemporarySave = () => {
  // 게시물 리스트 관리 객체
  const [postList, setPostList] = useState([]);

  // 임시저장 게시물 데이터 요청 함수
  const getPostList = async () => {
    await axios
      .get(process.env.REACT_APP_DB_HOST + "/api/temporaryPostList")
      .then((response) => {
        setPostList(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  // Mount
  useEffect(() => {
    getPostList();
  }, []);

  return <PostContainer postList={postList} postState="write" />;
};

export default TemporarySave;
