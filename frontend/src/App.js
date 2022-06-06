import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Home from "./pages/Home";
import ViewPost from "./pages/ViewPost";
import TemporarySave from "./pages/TemporarySave";

export const LoginInfoContext = React.createContext();
export const PostListContext = React.createContext();

function App() {
  // 로그인 정보
  const [loginInfo, setLoginInfo] = useState(null);

  // 로그인 정보 데이터 요청
  useEffect(() => {
    axios
      .post("/api/loginInfo")
      .then((response) => {
        console.log(response.data);
        setLoginInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
