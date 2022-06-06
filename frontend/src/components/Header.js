import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginInfoContext } from "../App";
import axios from "axios";
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
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { API_BASE_URL } from "../URL";
import { basicColor } from "../color";

const pages = ["생활", "학습"];

const Header = () => {
  /* NavMenu */
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  /* UserMenu */
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // loginMenu
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
      onClick: () => navigate("/temporary_save"),
      handleCloseUserMenu,
    },
    {
      title: "좋아요",
      onClick: () => console.log("좋아요 클릭"),
    },
    {
      title: <LogoutIcon />,
      onClick: () => (window.location.href = API_BASE_URL + "/logout"),
    },
  ];

  // 로그인 정보
  const loginInfo = useContext(LoginInfoContext);

  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: basicColor }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* 아이콘 */}
          <AdbIcon sx={{ display: "flex" }} />

          {/* 로고 Text */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ODI
          </Typography>

          {/* 생활, 학습 Tab 버튼 */}
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* 로그인 / 계정 메뉴 버튼 */}
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
                    <Typography textAlign="center">{menuItem.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
              <a href={API_BASE_URL + "/oauth2/authorization/google"}>
                <IconButton size="large">
                  <LoginIcon />
                </IconButton>
              </a>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
