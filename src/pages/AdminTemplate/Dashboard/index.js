import React, { useEffect, Fragment } from 'react';
import { Button, Table } from 'antd';
import { AudioOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actDeleteUser, actManageUser, actUpdateSelectUser } from './duck/actions';
import { NavLink, useNavigate } from 'react-router-dom';

export default function ManageUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataUser = useSelector((state) => state.manageUserReducer.data);

  useEffect(() => {
    dispatch(actManageUser());
  }, []);

  const handleInfoEditUser = (email) => {
    const user = dataUser?.find((user) => user.email === email);
    //dispatch thẳng lên store
    dispatch(actUpdateSelectUser(user));
    navigate("/admin/edit-user", { replace: true });
  }
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
      title: 'Tác Vụ',
      dataIndex: 'tacVu',
      width: '15%',
    },
  ];


  const renderData = () => {
    const data = dataUser && dataUser.length ? dataUser?.map((item, index) => {
      return {
        key: index,
        taiKhoan: item.taiKhoan,
        matKhau: item.matKhau,
        hoTen: item.hoTen,
        email: item.email,
        soDT: item.soDT,
        tacVu: <Fragment >
          <Button key={1} style={{ paddingBottom: '40px' }} className='text-2xl border-none' onClick={() => handleInfoEditUser(item.email)}><EditOutlined style={{ color: 'blue' }} /></Button>
          <Button key={2} style={{ paddingBottom: '43px', paddingTop: '0px' }} className='ml-2 text-2xl border-none' onClick={() => {
            if (window.confirm('Bạn có chắc muốn xóa tài khoản này ' + item.taiKhoan)) {
              //gọi action
              dispatch(actDeleteUser(item.taiKhoan));
              dispatch(actManageUser())
            }
          }}><DeleteOutlined style={{ color: 'red' }} /></Button>
        </Fragment>
      }

    }) : [];
    return <Table columns={columns} dataSource={data} onChange={onChange} />
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  //Search-Bar
  const { Search } = Input;

  const onSearch = (value) => {
    dispatch(actManageUser(value));
  };
  return (
    <div>
      <h2>Quản Lý Người Dùng</h2>
      <NavLink to={'/admin/add-user'} className='mb-3 btn btn-info' >Thêm người dùng</NavLink>
      <Search
        className='mb-5 bg-blue-500'
        placeholder="input search text"
        enterButton={<SearchOutlined />}
        size="large"
        allowClear
        onSearch={onSearch}
      />
      {renderData()}
    </div>
  )
}
