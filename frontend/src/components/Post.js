import React from "react";
import { useNavigate } from "react-router-dom";

/* mui/material */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

/* mui/icons-material */
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

/* utils */
import { API_BASE_URL } from "../utils/URL";
import { getDate } from "../utils/date";

const Post = ({ post, postState }) => {
  const navigate = useNavigate();

  // 미리보기 내용을 반환하는 함수. 내용이 일정 길이보다 길어지면 잘라서 반환
  const getPreview = (text, length) => {
    return text.length < length ? text : text.slice(0, length) + "...";
  };

  return (
    <Grid item key={post} xs={12} sm={12} md={6} lg={4} xl={3}>
      {/* 게시물 - 미리보기 */}
      <Card
        sx={{ width: 345, height: 345, cursor: "pointer", boxShadow: "3" }}
        onClick={
          postState === "Temporary"
            ? () =>
                (window.location.href =
                  API_BASE_URL + `/continueWrite/${post.id}`)
            : () => navigate(`/detail/${post.id}`)
        }
      >
        {/* 제목 */}
        <CardHeader title={getPreview(post.title, 15)} />

        {/* 본문 */}
        <CardContent sx={{ height: "165px" }}>
          <Typography variant="body2" color="text.secondary">
            {getPreview(post.contents, 150)}
          </Typography>
        </CardContent>

        {/* 작성일 */}
        {postState !== "Temporary" && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ px: 2, py: 0.5 }}
          >
            {getDate(post.createTime)}
          </Typography>
        )}

        {/* 작성자, 좋아요 */}
        {postState !== "Temporary" && (
          <>
            <Divider variant="middle" />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mx: 1,
              }}
            >
              <Typography fontSize="14px">
                by <strong>{post.writer}</strong>
              </Typography>
              <Box sx={{ display: "flex" }} fontSize="14px">
                <FavoriteBorderIcon fontSize="small" />
                <Typography fontSize="14px">&nbsp;{post.heartCount}</Typography>
              </Box>
            </CardContent>
          </>
        )}
      </Card>
    </Grid>
  );
};

export default Post;
