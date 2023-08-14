import { Navigate, Outlet, NavLink } from 'react-router-dom'
import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    FileOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';

export default function AdminTemplate() {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    if (!localStorage.getItem('UserAdmin')) {
        return <Navigate to={'/auth'} replace />
    }

    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        getItem(<NavLink to={'/admin/dashboard'}>
            User
        </NavLink>, '1', <UserOutlined />),
        getItem('Films', 'sub1', <FileOutlined />, [
            getItem(<NavLink to={'/admin/listmovie'}>
                Films
            </NavLink>, '2', <FileOutlined />),
            getItem('Add Films', '3', <FileOutlined />),
        ]),
    ];

    return (
        <div>
            <div
                className='admin-menu'
                style={{ width: `${collapsed ? '80px' : '256px'}` }}
            >
                <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    className='btn-menu'
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <Menu
                    className='ul-menu'
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
            <Outlet />
        </div>
    )
}
