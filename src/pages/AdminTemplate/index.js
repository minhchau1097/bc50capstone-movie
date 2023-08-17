import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import { NavLink, Navigate, Outlet } from 'react-router-dom';


const { Header, Content, Footer, Sider } = Layout;

export default function AdminTemplate() {
  const [collapsed, setCollapsed] = useState(false);
    if(!localStorage.getItem('UserAdmin')){
     return <Navigate to='/auth' replace/>
    }
  
 
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(<div className='p-2 w-100 h-100'><img src="https://cybersoft.edu.vn/wp-content/uploads/2022/10/cyberlogo-white.png" alt="" /></div>),
    getItem(<NavLink to={'/admin/dashboard'}>Người dùng</NavLink>, '1', <UserOutlined />),
    getItem(<NavLink to={'/admin/films'}>Phim</NavLink>, '2', <FileOutlined />),
  ];
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >

          <div
            style={{
              marginTop: 12,
              padding: 24,
              minHeight: '100%',
              background: colorBgContainer,
            }}
          >
            <Outlet />

          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
