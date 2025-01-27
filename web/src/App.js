import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router';
import {
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Home from './pages/Home';
import TestA from './pages/TestA';
import TestB from './pages/TestB';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('首页', '/', <PieChartOutlined />),
  getItem('测试1', '/test', <PieChartOutlined />),
];

const App = () => {
  let navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onSelect={(args) => {
            navigate(args.key);
          }}
        />
      </Sider>
      <Layout>
        <Content>
          <div
            style={{
              padding: 10,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            
            <Routes>
              <Route index element={<Home />} />
              <Route path="/test" element={<TestA />} />
              <Route path="/test/b" element={<TestB />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;