import React, { useEffect, useState } from 'react';
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
import Upload from 'antd/es/upload/Upload';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { actClearNewFilms, actGetAddNewFilms } from './duck/actions';
import { useNavigate } from 'react-router-dom';


export default function AddFilms() {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mess = useSelector(state => state.addNewFilmsReducer.data)
  useEffect(() => {
    if (mess) {
      alert(mess)
      dispatch(actClearNewFilms(navigate))
    }
  }, [mess])
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
      hinhAnh: {},

    },
    onSubmit: (values) => {
      values.maNhom = 'GP03'
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key])
        } else {
          formData.append('File', values.hinhAnh, values.hinhAnh.name)
        }
      }
      // console.log('first' , formData.get('File'))
      dispatch(actGetAddNewFilms(formData))
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

    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      setImgSrc(e.target.result)
    }
    formik.setFieldValue('hinhAnh', file)

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
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim" hasFeedback
        validateStatus="error"
        help="Should be combination of numbers & alphabets">
        <Input name='tenPhim' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name='trailer' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input name='moTa' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
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
      <Form.Item label="Số sao" >
        <InputNumber onChange={handleInputNumber('danhGia')} min={1} max={10} />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input type='file' onChange={handleChangeFile} accept='image/png , image/jpg, image/jpeg' />

        <img width={100} height={100} src={imgSrc} alt="..." />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <button className='btn btn-warning' type='submit'>Thêm phim</button>
      </Form.Item>
    </Form>
  )

}
