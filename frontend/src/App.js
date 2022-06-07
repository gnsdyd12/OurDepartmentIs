import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* axios */
import axios from "axios";

/* components */
import Header from "./components/Header";

/* pages */
import Home from "./pages/Home";
import ViewPost from "./pages/ViewPost";
import TemporarySave from "./pages/TemporarySave";

/* createContext */
export const LoginInfoContext = React.createContext();
export const PostListContext = React.createContext();

function App() {
  // 로그인 정보 관리 객체
  const [loginInfo, setLoginInfo] = useState(null);

  // 로그인 정보 데이터 요청 함수
  const getLoginInfo = async () => {
    await axios
      .post("/api/loginInfo")
      .then((response) => {
        setLoginInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Mount
  useEffect(() => {
    getLoginInfo();
  }, []);

  return (
    <LoginInfoContext.Provider value={loginInfo}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/temporary_save" element={<TemporarySave />} />
            <Route path="/view_post/:id" element={<ViewPost />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LoginInfoContext.Provider>
  );
}

export default App;
