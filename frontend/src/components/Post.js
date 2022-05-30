import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Post({ post }) {
  return (
    <Grid item key={post} xs={12} sm={12} md={6} lg={4} xl={3}>
      <Card sx={{ width: 345, height: 345, cursor: "pointer" }}>
        {/* 제목, 작성일 */}
        <CardHeader title={post.title} subheader={post.writer} />

        {/* 본문 */}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.contents}
          </Typography>
        </CardContent>

        {/* 좋아요 버튼 */}
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
