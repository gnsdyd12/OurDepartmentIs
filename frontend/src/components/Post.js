import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";

export default function Post({ post }) {
  // 미리보기 내용을 반환하는 함수. 내용이 일정 길이보다 길어지면 잘라서 반환한다.
  const getPreview = (text, length) => {
    return text.length < length ? text : text.slice(0, length) + "...";
  };

  const navigate = useNavigate();

  return (
    <Grid item key={post} xs={12} sm={12} md={6} lg={4} xl={3}>
      <Card
        sx={{ width: 345, height: 345, cursor: "pointer", boxShadow: "3" }}
        onClick={() => navigate(`/view_post/${post.id}`)}
      >
        {/* 제목, 작성일 */}
        <CardHeader title={getPreview(post.title, 15)} />

        {/* 본문 */}
        <CardContent sx={{ height: "180px" }}>
          <Typography variant="body2" color="text.secondary">
            {getPreview(post.contents, 150)}
          </Typography>
        </CardContent>

        {/* 작성자, 좋아요 */}
        <Divider variant="middle" />
        <CardContent
          disableSpacing
          sx={{ display: "flex", justifyContent: "space-between", mx: 1 }}
        >
          <Typography fontSize="14px">
            by <strong>{post.writer}</strong>
          </Typography>
          <Box sx={{ display: "flex" }} fontSize="14px">
            <FavoriteBorderIcon fontSize="small" />
            <Typography fontSize="14px">&nbsp;3</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
