import React, { useState } from 'react';
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
} from 'antd';
import { CheckOutlined, CloseOutlined, } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { actGetAddNewFilms } from './duck/actions';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";


export default function AddFilms() {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: null,

    },
    validationSchema: Yup.object({
      tenPhim: Yup.string()
        .min(5, 'Tối thiểu 5 ký tự')
        .max(50, 'Tối đa 50 ký tự')
        .required('Vui lòng không để trống'),
      trailer: Yup.string()
        .required('Vui lòng không để trống').url('Vui lòng nhập đường dẫn hợp lệ').nullable(),
      moTa: Yup.string()
        .min(20, 'Tối thiểu 20 ký tự')
        .required('Vui lòng không để trống'),
      ngayKhoiChieu: Yup.string()
        .required('Vui lòng không để trống'),
      danhGia: Yup.number()
        .required('Vui lòng không để trống')
        .integer('Vui lòng nhập số nguyên'),
    }),



    onSubmit: (values) => {
      values.maNhom = 'GP03'
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key])
        }
      }
      if (values.hinhAnh) {
        formData.append('File', values.hinhAnh, values.hinhAnh.name)
        dispatch(actGetAddNewFilms(formData, navigate))
      } else {
        alert('Vui lòng thêm hình ảnh')
      }
    }
  })
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleInputNumber = (name) => {
    return (value) => {

      formik.setFieldValue(name, value)
    }
  }
  const handleOnchangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }
  const onChangeDate = (value, string) => {
    // phai lay value thi string moi co gia tri de quy doi
    formik.setFieldValue('ngayKhoiChieu', string)
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    // tao doi tuong de doc file
    if (file) {

      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        setImgSrc(e.target.result)
      }
      formik.setFieldValue('hinhAnh', file)
    }

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

    >
      <h3 className='text-center'>Thêm phim</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim" required hasFeedback
        validateStatus={formik.errors.tenPhim && formik.touched.tenPhim ? 'error' : ''}
        help={formik.errors.tenPhim && formik.touched.tenPhim && (formik.errors.tenPhim)}>
        <Input name='tenPhim' required onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer" required hasFeedback
        validateStatus={formik.errors.trailer && formik.touched.trailer ? 'error' : ''}
        help={formik.errors.trailer && formik.touched.trailer && (formik.errors.trailer)}>
        <Input name='trailer' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mô tả" required hasFeedback
        validateStatus={formik.errors.moTa && formik.touched.moTa ? 'error' : ''}
        help={formik.errors.moTa && formik.touched.moTa && (formik.errors.moTa)}>
        <Input name='moTa' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu" required hasFeedback
        validateStatus={formik.errors.ngayKhoiChieu && formik.touched.ngayKhoiChieu ? 'error' : ''}
        help={formik.errors.ngayKhoiChieu && formik.touched.ngayKhoiChieu && (formik.errors.ngayKhoiChieu)}>
        <DatePicker format={'DD/MM/YYYY'} onChange={onChangeDate} />
      </Form.Item>
      <Form.Item label="Đang chiếu" >
        <Switch

          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={handleOnchangeSwitch('dangChieu')}


        />
      </Form.Item>
      <Form.Item label="Sắp chiếu" >
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={handleOnchangeSwitch('sapChieu')}
        />
      </Form.Item>
      <Form.Item label="Hot" >
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={handleOnchangeSwitch('hot')}
        />
      </Form.Item>
      <Form.Item label="Số sao" required hasFeedback
        validateStatus={formik.errors.danhGia && formik.touched.danhGia ? 'error' : ''}
        help={formik.errors.danhGia && formik.touched.danhGia && (formik.errors.danhGia)} >
        <InputNumber defaultValue={0} min={0} max={10} onChange={handleInputNumber('danhGia')} />
      </Form.Item>
      <Form.Item label="Hình ảnh" required>
        <input type='file' onChange={handleChangeFile} accept='image/png , image/jpg, image/jpeg' />

        <img width={100} height={100} src={imgSrc} alt="..." />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <button className='btn btn-warning' type='submit'>Thêm phim</button>
      </Form.Item>
    </Form>
  )

}
