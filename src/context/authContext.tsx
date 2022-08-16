import { createContext, useEffect, useState } from "react";
import {
  IAuthContext,
  ILogin,
  IRegister,
  IResponseAuth,
  IToken,
  IUser,
} from "../types/types";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

export const AuthContext = createContext<IAuthContext | null>(null);

interface Props {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState<IToken | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const lsToken = localStorage.getItem("notine-token");

    if (lsToken) {
      setToken({ token: lsToken });
      navigate(location.pathname);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleRegister(registerData: IRegister) {
    await axios
      .post(`${process.env.REACT_APP_API_HEROKU_BASE_URL}user/register`, {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        age: registerData.age,
      })
      .then((response: { data: IResponseAuth }) => {
        setUser(response.data.user);
        setToken({ token: response.data.token });

        localStorage.setItem("notine-token", response.data.token);
        navigate("/");
      })
      .catch((response) => {
        message.error("Error register to app." + response.data);
      });
  }

  async function handleLogin(loginData: ILogin) {
    await axios
      .post(`${process.env.REACT_APP_API_HEROKU_BASE_URL}user/login`, {
        email: loginData.email,
        password: loginData.password,
      })
      .then((response: { data: IResponseAuth }) => {
        setUser(response.data.user);
        setToken({ token: response.data.token });

        localStorage.setItem("notine-token", response.data.token);
        navigate("/");
      })
      .catch((response) => {
        message.error("Error log into app." + response.data);
      });
  }

  async function handleLogout() {
    await axios
      .post(
        `${process.env.REACT_APP_API_HEROKU_BASE_URL}user/logout`,
        {},
        {
          headers: {
            authorization: `Bearer ${token?.token}`,
          },
        }
      )
      .then(() => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("notine-token");
        navigate("/");
      })
      .catch((response) => {
        message.error("Error log out of app." + response.data);
      });

    navigate("/");
  }

  const value = {
    token,
    user,
    onLogin: handleLogin,
    onRegister: handleRegister,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
