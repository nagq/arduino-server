import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router';
import { Layout, Menu, theme } from 'antd';
import Home from './pages/Home';
import TestA from './pages/TestA';
import TestB from './pages/TestB';
import RrelayControl from './pages/RelayControl';

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

// 左侧导航
const items = [
  getItem('首页', '/'),
  getItem('测试', '/test'),
  getItem('RELAY_CONTROL', '/relay_control'),
];

const App = () => {
  let navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
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
              minHeight: '100vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            
            <Routes>
              {/* 路由配置 */}
              <Route index element={<Home />} />
              <Route path="/test" element={<TestA />} />
              <Route path="/test/b" element={<TestB />} />
              <Route path="/relay_control" element={<RrelayControl />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;