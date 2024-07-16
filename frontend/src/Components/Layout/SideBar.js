import React, { useState } from "react";
import { DesktopOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import logo from "../../Images/momento.png";
import { useNavigate } from "react-router-dom";
import { PoweroffOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const items = [
  getItem("Profile", "profile", <DesktopOutlined />),
  getItem("Moments", "1", <UserOutlined />, [getItem("Moment list", "mList"), getItem("Add moment", "addM")]),
];
const items1 = ["1", "2", "3"].map((key) => ({ key, label: `nav ${key}` }));

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const signOut = () => {
    localStorage.clear();
    navigate("/sign-in");
  };
  const handleClick = (event) => {
    if (event.key === "profile") {
      navigate("/");
    } else if (event.key === "addM") {
      navigate("/add-moment");
    } else if (event.key === "mList") {
      navigate("/moment-list");
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className='demo-logo-vertical' />
        <div className='my-5 text-center'>
          <img src={logo} style={{ width: "90%" }} />
        </div>
        <Menu
          defaultSelectedKeys={["0"]}
          theme='dark'
          // defaultSelectedKeys={["1"]}
          mode='inline'
          items={items}
          onClick={(e) => handleClick(e)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}>
          <div className='demo-logo' />
          {/* <Menu theme='dark' mode='horizontal' defaultSelectedKeys={["2"]} items={items1} /> */}
          <Button className='my-3' type='primary' icon={<PoweroffOutlined />} onClick={() => signOut()} />
        </Header>

        <Content
          style={{
            margin: "0 16px",
          }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Sidebar;
