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
} from "@mui/material";

/* mui/icons-material */
import AdbIcon from "@mui/icons-material/Adb";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

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
      onClick: () => console.log("좋아요 클릭"),
    },
    {
      title: <LogoutIcon />,
      onClick: () => (window.location.href = API_BASE_URL + "/logout"),
    },
  ];

  // 로그인 정보
  const loginInfo = useContext(LoginInfoContext);

  return (
    <AppBar position="static" sx={{ backgroundColor: basicColor }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", px: 3 }}>
          {/* 로고 */}
          <Box sx={{ display: "flex" }}>
            {/* 아이콘 */}
            <AdbIcon />

            {/* Text */}
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
                <IconButton>
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
