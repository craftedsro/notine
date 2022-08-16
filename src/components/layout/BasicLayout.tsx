import { Layout, Menu, MenuProps } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { IAuthContext } from "../../types/types";

const { Header, Content, Footer } = Layout;

const defaultItem: MenuProps["items"] = [
  { label: <Link to="/">Home</Link>, key: "home", icon: <HomeOutlined /> },
];

interface Props {
  children: JSX.Element;
}

const BasicLayout = ({ children }: Props) => {
  const { token, onLogout } = useContext(AuthContext) as IAuthContext;
  const [items, setItems] = useState(defaultItem);

  useEffect(() => {
    if (token !== null) {
      setItems([
        ...defaultItem,
        {
          label: (
            <Link to="" onClick={onLogout}>
              Log out
            </Link>
          ),
          key: "logout",
        },
      ]);
    } else {
      setItems(defaultItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, defaultItem]);

  return (
    <Layout className="page">
      <Header className="header">
        <Link to="/">
          <h4 className="logo">Homework</h4>
        </Link>
        <Menu
          className="menu"
          mode="horizontal"
          defaultSelectedKeys={[]}
          items={items}
        />
      </Header>
      <Content className="content">
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer className="footer">
        Homework ©2022 Created by Milan Jakubec
      </Footer>
    </Layout>
  );
};

export default BasicLayout;
