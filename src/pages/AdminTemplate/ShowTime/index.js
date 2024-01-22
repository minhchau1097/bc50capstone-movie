import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import {
  DatePicker,
  Form,
  InputNumber,
  Select,
} from 'antd';
import dayjs from 'dayjs';
import { actGetEditFilms } from '../EditFilms/duck/actions';
import { actCreateCalendar, actGetMovieTheater, actGetMovieTheaterCluster } from './duck/actions';
import * as Yup from "yup";
import { DOMAIN_IMG } from 'utils/api';

export default function ShowTime() {
  const param = useParams();
  const dataEdit = useSelector(state => state.editFilmsReducer.data)
  const [componentSize, setComponentSize] = useState('default');
  const dispatch = useDispatch();
  const dateFormat = "DD/MM/YYYY HH:mm:ss";
  const movieTheater = useSelector(state => state.showTimeInforReducer.movieTheater)
  const cluster = useSelector(state => state.showTimeInforReducer.cluster)
  const navigate = useNavigate();
  const [list ,setList] = useState()
  useEffect(() => {
    dispatch(actGetEditFilms(param.id))
    dispatch(actGetMovieTheater())
  }, [])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: param.id,
      ngayChieuGioChieu: '',
      maRap: '',
      maCumRap: '',
      giaVe: '',
      heThongRap: '',
    },
    validationSchema: Yup.object({
      maRap: Yup.string()
        .required('Vui lòng không để trống'),
      maCumRap: Yup.string()
        .required('Vui lòng không để trống'),
      ngayChieuGioChieu: Yup.string().required('Vui lòng không để trống'),
      giaVe: Yup.number().integer('Vui lòng nhập số nguyên').required('Vui lòng không để trống'),
      heThongRap: Yup.string()
        .required('Vui lòng không để trống'),
    }),
    onSubmit: (values) => {
      const {maCumRap,heThongRap, ...newValues} = values
      dispatch(actCreateCalendar(newValues, navigate))

    }
  })
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const onChange = (value) => {
    if (value) {
      formik.setFieldValue('ngayChieuGioChieu', dayjs(value).format())
    }
  };
  const onOk = (value) => {
    if (value) {

      formik.setFieldValue('ngayChieuGioChieu', dayjs(value).format())
    }
  };
  const handleChangeMovieTheater = (values) => {
    formik.setFieldValue('heThongRap', values)
    dispatch(actGetMovieTheaterCluster(values))

  };
  const handleChangeMovieTheaterCluster = (values) => {
    formik.setFieldValue('maRap', values)
  };
  const handleChangeMovieTheaterComplex = (values) => {
    formik.setFieldValue('maCumRap', values)
    cluster?.forEach((item)=>{
      if(item.maCumRap === values){
        setList(item.danhSachRap)

      }
    })
  };
  const handleOnchangeInputNumber = (value) => {
    formik.setFieldValue('giaVe', value)
  }
  return (
    <div className='container-fluid'>
      <h3 className='text-center'>Tạo lịch chiếu </h3>
      <h4>Phim {dataEdit?.tenPhim}</h4>
      <div className='row mt-5'>
        <div className='col-12 col-lg-6'>
          <img width={200} height={200} src={DOMAIN_IMG+dataEdit?.hinhAnh} alt="" />
        </div>
        <div className='col-12 col-lg-6 mt-md-5 mt-lg-0'>
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
              size: componentSize
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}

            style={{
              maxWidth: 600,
            }}
          >

            <Form.Item label="Hệ thống rạp"
              hasFeedback
              required
              validateStatus={formik.errors.heThongRap && formik.touched.heThongRap ? 'error' : ''}
              help={formik.errors.heThongRap && formik.touched.heThongRap && (formik.errors.heThongRap)}
            >
              <Select

                style={{
                  width: '100%',
                }}
                placeholder="Chọn hệ thống rạp"
                onChange={handleChangeMovieTheater}
                options={movieTheater?.map((item, index) => { return { label: item.tenHeThongRap, value: item.maHeThongRap } })}
              />
            </Form.Item>
            <Form.Item label="Cụm rạp" required hasFeedback validateStatus={formik.errors.maCumRap && formik.touched.maCumRap ? 'error' : ''}
              help={formik.errors.maCumRap && formik.touched.maCumRap && (formik.errors.maCumRap)}>
              <Select

                style={{
                  width: '100%',
                }}

                placeholder="Chọn cụm rạp"
                onChange={handleChangeMovieTheaterComplex}
                options={cluster?.map((item) => { return { label: item.tenCumRap, value: item.maCumRap } })}
              />
            </Form.Item>
            <Form.Item label="Mã rạp" required hasFeedback validateStatus={formik.errors.maRap && formik.touched.maRap ? 'error' : ''}
              help={formik.errors.maRap && formik.touched.maRap && (formik.errors.maRap)}>
              <Select

                style={{
                  width: '100%',
                }}

                placeholder="Chọn mã rạp"
                onChange={handleChangeMovieTheaterCluster}
                options={list?.map((item) => { return { label: item.tenRap, value: item.maRap } })}
              />
            </Form.Item>

            <Form.Item required label="Ngày khởi chiếu" hasFeedback validateStatus={formik.errors.ngayChieuGioChieu && formik.touched.ngayChieuGioChieu ? 'error' : ''}
              help={formik.errors.ngayChieuGioChieu && formik.touched.ngayChieuGioChieu && (formik.errors.ngayChieuGioChieu)} >
              <DatePicker showTime onChange={onChange} onOk={onOk} format={dateFormat} />
            </Form.Item>
            <Form.Item label="Giá vé" required hasFeedback validateStatus={formik.errors.giaVe && formik.touched.giaVe ? 'error' : ''}
              help={formik.errors.giaVe && formik.touched.giaVe && (formik.errors.giaVe)}>
              <InputNumber min={75000} max={150000} onChange={handleOnchangeInputNumber} />
            </Form.Item>
            <Form.Item label="Tác vụ">
              <button className='btn btn-warning' type='submit'>Tạo lịch chiếu</button>
            </Form.Item>

          </Form>
        </div>
      </div>
    </div>
  )
}
