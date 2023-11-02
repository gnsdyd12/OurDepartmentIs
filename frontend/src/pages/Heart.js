import React from "react";
/* components */
import PostContainer from "../components/PostContainer";

// '좋아요' 한 게시물 리스트 출력 페이지
const Heart = () => {
  return (
    <>
      <PostContainer postState="Heart" />
    </>
  );
};

export default Heart;
