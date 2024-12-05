import React, { useEffect } from "react";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import { authSelector, AuthTypeState } from "../redux/reducers/authReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RouterMain = () => {
  const auth: AuthTypeState = useSelector(authSelector);
  console.log("Login: ", auth);

  return !localStorage.getItem("user") ? <AuthRouter /> : <MainRouter />;
};

export default RouterMain;
