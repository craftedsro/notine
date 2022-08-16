import React from "react";
import "../App.css";
import "antd/dist/antd.min.css";
import { Outlet } from "react-router-dom";
import BasicLayout from "../components/layout/BasicLayout";

function App() {
  return <BasicLayout children={<Outlet />} />;
}

export default App;
