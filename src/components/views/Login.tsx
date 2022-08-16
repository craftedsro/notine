import React from "react";
import ContentLayout from "../layout/ContentLayout";
import LoginForm from "../forms/LoginForm";

const Login = () => {
  return (
    <ContentLayout title="Login to awesome Todo" children={<LoginForm />} />
  );
};

export default Login;
