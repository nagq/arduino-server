import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router';
import { Layout, Menu, theme } from 'antd';
import Home from './pages/Home';
import RrelayControl from './pages/RelayControl';

import Page01 from './pages/Page01';
import Page02 from './pages/Page02';
import Page03 from './pages/Page03';
import Page04 from './pages/Page04';
import Page05 from './pages/Page05';
import Page06 from './pages/Page06';
import Page07 from './pages/Page07';
import Page08 from './pages/Page08';
import Page09 from './pages/Page09';
import Page10 from './pages/Page10';

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

// 左侧导航
const items = [
  getItem('HOME', '/'),
  getItem('OUTPUT', '/relay_control'),

  getItem('PAGE 1', '/page_01'),
  getItem('PAGE 2', '/page_02'),
  getItem('PAGE 3', '/page_03'),
  getItem('PAGE 4', '/page_04'),
  getItem('PAGE 5', '/page_05'),
  getItem('PAGE 6', '/page_06'),
  getItem('PAGE 7', '/page_07'),
  getItem('PAGE 8', '/page_08'),
  getItem('PAGE 9', '/page_09'),
  getItem('PAGE 10', '/page_10'),
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
        <div className="logo">HANKERILA</div>
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
              <Route path="/relay_control" element={<RrelayControl />} />

              <Route path="/page_01" element={<Page01 />} />
              <Route path="/page_02" element={<Page02 />} />
              <Route path="/page_03" element={<Page03 />} />
              <Route path="/page_04" element={<Page04 />} />
              <Route path="/page_05" element={<Page05 />} />
              <Route path="/page_06" element={<Page06 />} />
              <Route path="/page_07" element={<Page07 />} />
              <Route path="/page_08" element={<Page08 />} />
              <Route path="/page_09" element={<Page09 />} />
              <Route path="/page_10" element={<Page10 />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;