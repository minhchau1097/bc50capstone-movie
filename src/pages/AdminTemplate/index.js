import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  FileTextOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { styled } from 'styled-components';


const { Header, Content, Footer, Sider } = Layout;

export default function AdminTemplate() {
  const [collapsed, setCollapsed] = useState(false);
  const Wrapper = styled.section`
    background-image: url(https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=826&t=st=1692949167~exp=1692949767~hmac=db15d559f4ed1e36aeed2eba15a983d9212fa4247fb77f52ecdb7393b78a0036);
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
`;
  if (localStorage.getItem('Customer')) {
    return <Wrapper ></Wrapper>
  } else if (!localStorage.getItem('UserAdmin')) {
    return <Navigate to='/auth' replace />
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
    getItem(<NavLink to={'/admin/dashboard'} className="text-gray-400">Người dùng</NavLink>, '1', <UserOutlined />, [
      getItem(<NavLink to={'/admin/dashboard'} >Người dùng</NavLink>, '10', <UserOutlined />),
      getItem(<NavLink to={'/admin/add-user'} >Thêm người dùng</NavLink>, '11', <UserAddOutlined />),
      getItem(<NavLink to={'/admin/edit-user'} >Sửa người dùng</NavLink>, '12', <FileTextOutlined />),
    ]),
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
        <Menu theme="dark" defaultSelectedKeys={['10']} mode="inline" items={items} />
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
