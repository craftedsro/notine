import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import React from "react";
import Home from "../components/views/Home";
import Detail from "../components/views/Detail";
import NoContent from "../components/views/NoContent";
import APIContextProvider from "../context/apiContext";
import { AuthProvider } from "../context/authContext";
import Login from "../components/views/Login";
import Register from "../components/views/Register";
import ProtectedRoute from "./ProtectedRoute";

const Root = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <APIContextProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="detail/:todoId"
                element={
                  <ProtectedRoute>
                    <Detail />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NoContent />} />
            </Route>
          </Routes>
        </APIContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Root;
