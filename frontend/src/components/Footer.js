import { Typography, Link, Box } from "@mui/material";

/**
 *@author Suin-Jeong, suin8@jbnu.ac.kr
 *@date 2022-04-13
 *@description Footer의 최하단 저작권 표기
 */

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.jbnu.ac.kr/kor/">
        Jeonbuk National University
      </Link>{" "}
      All rights reserved.
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#ececec", p: 5 }} component="footer">
      <Typography variant="h6" align="center" color="text.secondary">
        지금 우리 학과는
      </Typography>
      <Copyright />
    </Box>
  );
};

export default Footer;
