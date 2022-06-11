import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

/* useContext */
import { LoginInfoContext } from "../App";

/* mui/material */
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  Stack,
} from "@mui/material";

/* mui/icons-material */
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloudIcon from "@mui/icons-material/Cloud";

/* utils */
import { API_BASE_URL } from "../utils/URL";
import { basicColor } from "../utils/color";

const Header = () => {
  const navigate = useNavigate();

  /* 사용자 메뉴 */
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // 로그인 메뉴
  const loginMenu = [
    {
      title: "내 정보",
      onClick: () => console.log("내 정보 클릭"),
    },
    {
      title: "글쓰기",
      onClick: () => (window.location.href = API_BASE_URL + "/write_post"),
    },
    {
      title: "임시 저장",
      onClick: () => {
        navigate("/temporary_save");
        handleCloseUserMenu();
      },
    },
    {
      title: "좋아요",
      onClick: () => {
        navigate("/heart");
        handleCloseUserMenu();
      },
    },
    {
      title: <LogoutIcon />,
      onClick: () => (window.location.href = API_BASE_URL + "/logout"),
    },
  ];

  // 로그인 정보
  const loginInfo = useContext(LoginInfoContext);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: basicColor, height: 80, justifyContent: "center" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", px: 3 }}>
          {/* 로고 */}
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <CloudIcon sx={{ fontSize: 36, mx: 1 }} />
            ODI
          </Typography>

          {/* 검색, 로그인 메뉴 버튼 Stack */}
          <Stack direction="row" spacing={4}>
            {/* 검색 버튼 */}
            <Tooltip title="검색하기">
              <IconButton sx={{ p: 0 }} onClick={() => navigate("/search")}>
                <SearchIcon sx={{ fontSize: 36 }} />
              </IconButton>
            </Tooltip>

            {/* 로그인 메뉴 버튼 */}
            {loginInfo ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="메뉴 열어보기">
                  <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <img
                      src={loginInfo.picture}
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "22.5px",
                      }}
                    />
                    <KeyboardArrowDownIcon
                      sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                    />
                  </Button>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {loginMenu.map((menuItem) => (
                    <MenuItem key={menuItem.title} onClick={menuItem.onClick}>
                      <Typography textAlign="center">
                        {menuItem.title}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <>
                <a href={API_BASE_URL + "/oauth2/authorization/google"}>
                  <IconButton>
                    <LoginIcon sx={{ fontSize: 36 }} />
                  </IconButton>
                </a>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
