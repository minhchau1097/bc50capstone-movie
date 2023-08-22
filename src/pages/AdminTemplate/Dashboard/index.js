import React, { useEffect,Fragment } from 'react';
import { Button, Table } from 'antd';
import { AudioOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actManageUser } from './duck/actions';
import { NavLink } from 'react-router-dom';

export default function ManageUser() {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.manageUserReducer.data);

  useEffect(() => {
    dispatch(actManageUser());
  }, []);
  
  //Table Antd
  const columns = [
    {
      title: 'Tài Khoản',
      dataIndex: 'taiKhoan',
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      width: '15%',
    },
    {
      title: 'Mật Khẩu',
      dataIndex: 'matKhau',
      sorter: (a, b) => {
        let matKhauA = a.matKhau.toLowerCase().trim();
        let matKhauB = b.matKhau.toLowerCase().trim();
        if (matKhauA > matKhauB) {
          return 1;
        }
        return -1;
      },
      width: '15%',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'hoTen',
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => {
        let emailA = a.email.toLowerCase().trim();
        let emailB = b.email.toLowerCase().trim();
        if (emailA > emailB) {
          return 1;
        }
        return -1;
      },
      width: '20%',
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'soDT',
      sorter: (a, b) => {
        let soDTA = a.soDT.toLowerCase().trim();
        let soDTB = b.soDT.toLowerCase().trim();
        if (soDTA > soDTB) {
          return 1;
        }
        return -1;
      },
      width: '15%',
    },
    {
      title: 'Thao Tác',
      dataIndex: '',
      render: (item, object) => {
        return (
          <Fragment key={object}>
            <NavLink key={1} className='text-2xl' to={'/admin/edit-user'}><EditOutlined /></NavLink>
            <NavLink key={2} className='ml-4 text-2xl' to={'/'}><DeleteOutlined style={{ color: 'red' }} /></NavLink>
          </Fragment>
        )
      },
      width: '15%',
    },
  ];

  const data = dataUser;

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  //Search-Bar
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );
  const onSearch = (value) => console.log(value);
  return (
    <div>
      <h2>Quản Lý Người Dùng</h2>
      <NavLink to={'/admin/add-user'} className='mb-3 btn btn-info' >Thêm người dùng</NavLink>
      <Search
        className='mb-5 bg-blue-500'
        placeholder="input search text"
        enterButton={<SearchOutlined />}
        size="large"
        suffix={suffix}
        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  )
}
