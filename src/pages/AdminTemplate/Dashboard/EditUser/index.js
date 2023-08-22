import React, { useState } from 'react';
import {
  Form,
  Input,
  Radio,
  Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actEditUser } from '../duck/actions';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const addUserSchema = yup.object().shape({
  hoTen: yup.string().required('Vui lòng nhập họ tên'),
  taiKhoan: yup.string().required('Vui lòng nhập tài khoản'),
  matKhau: yup.string().required('Vui lòng nhập mật khẩu'),
  email: yup.string().required('Vui lòng nhập email').email('nhập email'),
  soDT: yup.string().required('Vui lòng nhập số điện thoại').matches(/^[0-9]+$/, 'Phải nhập dạng số'),
  maLoaiNguoiDung: yup.string().required('Chọn loại người dùng cần thêm'),
})

const yupSync = {
  async validator({ field }, value) {
    await addUserSchema.validateSyncAt(field, { [field]: value });
  },
};

const EditUser = () => {
  const [componentSize, setComponentSize] = useState('default');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const dataUser = useSelector((state) => state.manageUserReducer.data);
  // console.log("🚀 ~ file: index.js:32 ~ EditUser ~ dataUser:", dataUser)

  const [form] = Form.useForm();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };


  const onSubmitEditForm = (values) => {
    console.log('values: ', values);
    values.maNhom = "GP01";
    dispatch(actEditUser(values, navigate));
  }

  return (
    <Form
      form={form}
      onFinish={onSubmitEditForm}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <h2>Sửa Thông Tin Người Dùng</h2>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Họ Tên" name='hoTen' rules={[yupSync]} >
        <Input placeholder='Nhập họ tên' />
      </Form.Item>
      <Form.Item label="Tài Khoản" name='taiKhoan' rules={[yupSync]}>
        <Input placeholder='Nhập ID tài khoản' />
      </Form.Item>
      <Form.Item label="Mật Khẩu" name='matKhau' rules={[yupSync]}>
        <Input placeholder='Nhập mật khẩu' />
      </Form.Item>
      <Form.Item label="Email" name='email' rules={[yupSync]}>
        <Input placeholder='Nhập email' />
      </Form.Item>
      <Form.Item label="Số Điện Thoại" name='soDT' rules={[yupSync]}>
        <Input placeholder='Nhập số điện thoại' />
      </Form.Item>
      <Form.Item label="Mã Loại" name='maLoaiNguoiDung' rules={[yupSync]}>
        <Select >
          <Select.Option value="QuanTri">Quản Trị</Select.Option>
          <Select.Option value="KhachHang">Khách Hàng</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Tác Vụ">
        <button type='submit' className='text-white p-2 rounded-lg' style={{ backgroundColor: 'blueviolet' }}>Sửa Thông Tin</button>
      </Form.Item>
    </Form>
  );
};
export default EditUser;