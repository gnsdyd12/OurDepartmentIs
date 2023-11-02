import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
/* axios */
import axios from "axios";
/* components */
import Header from "./components/Header";
/* pages */
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import TemporarySave from "./pages/TemporarySave";
import Heart from "./pages/Heart";
import Search from "./pages/Search";
import MyInfo from "./pages/MyInfo";

// 쿠키 허용 (https://inpa.tistory.com/entry/AXIOS-📚-CORS-쿠키-전송withCredentials-옵션)
axios.defaults.withCredentials = true;

// 로그인 정보 - createContext
export const LoginInfoContext = React.createContext();

function App() {
  // 로그인 정보
  const [loginInfo, setLoginInfo] = useState(null);

  // 로그인 정보 데이터 요청 함수
  const getLoginInfo = async () => {
    await axios
      .post(process.env.REACT_APP_DB_HOST + "/api/loginInfo")
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
            <Route path="/heart" element={<Heart />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/my_info" element={<MyInfo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LoginInfoContext.Provider>
  );
}

export default App;
