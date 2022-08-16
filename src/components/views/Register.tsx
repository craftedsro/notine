import React from "react";
import ContentLayout from "../layout/ContentLayout";
import RegisterForm from "../forms/RegisterForm";

const Register = () => {
  return (
    <ContentLayout
      title="Register to awesome Todo"
      children={<RegisterForm />}
    />
  );
};

export default Register;
