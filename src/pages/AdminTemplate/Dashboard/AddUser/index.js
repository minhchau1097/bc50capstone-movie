import React, { useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import { useFormik } from 'formik';


const AddUser = () => {
  const [componentSize, setComponentSize] = useState('default');

  const formik = useFormik({
    initialValues: {
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "",
    },
    onSubmit: (values) => {
      console.log("🚀 ~ file: index.js:25 ~ AddUser ~ values:", values)

    }
  })
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleChangeSelect = (value) => {
    let maLoaiNguoiDung = value;
    formik.setFieldValue('maLoaiNguoiDung', maLoaiNguoiDung);
  }
  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
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
      <h2>Thêm Người Dùng Mới</h2>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Họ Tên">
        <Input name='hoTen' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Tài Khoản">
        <Input name='taiKhoan' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mật Khẩu">
        <Input name='matKhau' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Email">
        <Input name='email' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Số Điện Thoại">
        <Input name='soDT' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mã Loại" name='maLoaiNguoiDung' >
        <Select onChange={handleChangeSelect}>
          <Select.Option value="QuanTri">Quản Trị</Select.Option>
          <Select.Option value="KhachHang">Khách Hàng</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Điều Khiển">
        <button type='submit' className='text-white p-2 rounded-lg' style={{ backgroundColor: 'blueviolet' }}>Thêm user</button>
      </Form.Item>
    </Form>
  );
};
export default AddUser;