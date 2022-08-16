import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { IAuthContext } from "../types/types";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const { token } = useContext(AuthContext) as IAuthContext;
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
