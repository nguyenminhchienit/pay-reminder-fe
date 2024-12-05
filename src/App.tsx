import React from "react";
import "./App.css";
import RouterMain from "./routers/RouterMain";
import { ConfigProvider, message } from "antd";
import { BrowserRouter } from "react-router-dom";

message.config({
  top: 30,
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
});

function App() {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorTextHeading: "#0d6efd",
            colorPrimary: "#0d6efd",
          },
        }}
      >
        <RouterMain />
      </ConfigProvider>
    </div>
  );
}

export default App;
