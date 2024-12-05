import DemoDefaultTooltip from "../components/Test";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../screens/auths/Login";
import Header from "../components/Header";

const MainRouter = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/trang-chu" element={<DemoDefaultTooltip />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
};

export default MainRouter;
