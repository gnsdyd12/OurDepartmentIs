import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ViewPost from "./pages/ViewPost";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view_post/:id" element={<ViewPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
