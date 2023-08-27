import React, { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Input,
  Radio,
  Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { actEditPersonalInfo, actFetchPersonalInfo, actUpdateInput } from './duck/actions';

export default function PersonalInfo() {
  const [componentSize, setComponentSize] = useState('default');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const { personalInfo } = useSelector((state) => state.personalInfoReducer);

  useEffect(() => {
    dispatch(actFetchPersonalInfo());
  }, []);

  const onSubmitForm = (values) => {
    values.maNhom = "GP01";
    dispatch(actFetchPersonalInfo(values));
    dispatch(actEditPersonalInfo(values, navigate));
  }
  const initialValues = {
    hoTen: "",
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDT: "",
    maLoaiNguoiDung: "",
  }
  const { TextArea } = Input;
  return (
    <Form
      className='ml-96'
      form={form}
      onFinish={onSubmitForm}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={personalInfo !== '' ? personalInfo : initialValues}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <h2>Thông Tin Cá Nhân</h2>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Họ Tên" name='hoTen' >
        <Input placeholder='Nhập họ tên' />
      </Form.Item>
      <Form.Item label="Tài Khoản" name='taiKhoan' >
        <Input placeholder='Nhập ID tài khoản' disabled={true} />
      </Form.Item>
      <Form.Item label="Mật Khẩu" name='matKhau' >
        <Input placeholder='Nhập mật khẩu' />
      </Form.Item>
      <Form.Item label="Email" name='email' >
        <Input placeholder='Nhập email' />
      </Form.Item>
      <Form.Item label="Số Điện Thoại" name='soDT' >
        <Input placeholder='Nhập số điện thoại' />
      </Form.Item>
      <Form.Item label="Thông Tin Đặt Vé" name='thongTinDatVe' >
        <TextArea rows={8} placeholder='' className='font-medium' />
      </Form.Item>
      <Form.Item label="Thông Tin Ghế Đặt" name='thongTinGhe' >
        <TextArea rows={8} placeholder='' className='font-medium' />
      </Form.Item>
      <Form.Item label="Mã Loại" name='maLoaiNguoiDung' >
        <Select >
          <Select.Option value="QuanTri">Quản Trị</Select.Option>
          <Select.Option value="KhachHang">Khách Hàng</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Tác Vụ">
        <button type='submit' className='text-white p-2 px-3 rounded-lg' style={{ backgroundColor: 'blueviolet' }}>Cập nhật</button>
        <Link to={'/'} className='text-white p-2 px-3 rounded-lg ml-4' style={{ backgroundColor: 'blueviolet' }}>Về Trang Chủ</Link>
      </Form.Item>
    </Form>
  )
}
