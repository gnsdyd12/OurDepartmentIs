import React from "react";
import { useNavigate } from "react-router-dom";
/* mui/material */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
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

  return (
    <Grid item key={post} xs={12} sm={12} md={6} lg={4} xl={3}>
      {/* 게시물 - 미리보기 */}
      <Card
        sx={{ height: "100%", cursor: "pointer", boxShadow: "3" }}
        onClick={
          // 임시 저장 게시물이면 이어 쓰기 페이지로 이동, 아니면 Detail 페이지로 이동
          postState === "write"
            ? () =>
                (window.location.href =
                  API_BASE_URL + `/continueWrite/${post.id}`)
            : () => navigate(`/detail/${post.id}`)
        }
      >
        {/* 제목 */}
        <CardHeader
          sx={{
            ".MuiCardHeader-content": {
              overflow: "hidden",
            },
          }}
          title={post.title}
          titleTypographyProps={{ noWrap: true }}
        />

        {/* 본문 */}
        <CardContent sx={{ height: "165px" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "6",
              WebkitBoxOrient: "vertical",
            }}
          >
            {post.contents}
          </Typography>
        </CardContent>

        {/* 작성일 */}
        {postState === "read" && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ px: 2, py: 0.5 }}
          >
            {getDate(post.createTime)}
          </Typography>
        )}

        {/* 작성자, 좋아요 개수 */}
        {postState === "read" && (
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
