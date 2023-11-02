import React from "react";
/* components */
import PostContainer from "../components/PostContainer";

// 임시 저장 게시물 리스트 출력 페이지
const TemporarySave = () => {
  return (
    <>
      <PostContainer postState="temporary" />
    </>
  );
};

export default TemporarySave;
