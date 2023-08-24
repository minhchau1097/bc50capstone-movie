import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Switch,
} from 'antd';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { actGetEditFilms, actUpdateEditFilms } from './duck/actions';
import dayjs from 'dayjs';
import * as Yup from "yup";


export default function EditFilms() {
    const dateFormat = "DD/MM/YYYY";
    const param = useParams();
    const dataEdit = useSelector(state => state.editFilmsReducer.data)
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(actGetEditFilms(param.id))
    }, [])


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: dataEdit?.maPhim,
            tenPhim: dataEdit?.tenPhim,
            trailer: dataEdit?.trailer,
            moTa: dataEdit?.moTa,
            ngayKhoiChieu: dataEdit?.ngayKhoiChieu,
            dangChieu: dataEdit?.dangChieu,
            sapChieu: dataEdit?.sapChieu,
            hot: dataEdit?.hot,
            danhGia: dataEdit?.danhGia,
            hinhAnh: null

        },
        validationSchema: Yup.object({
            tenPhim: Yup.string()
                .min(5, 'Tối thiểu 5 ký tự')
                .max(40, 'Tối đa 40 ký tự')
                .required('Vui lòng không để trống'),
            trailer: Yup.string()
                .required('Vui lòng không để trống').url('Vui lòng nhập đường dẫn hợp lệ').nullable(),
            moTa: Yup.string()
                .min(5, 'Tối thiểu 5 ký tự')
                .max(250, 'Tối đa 250 ký tự')
                .required('Vui lòng không để trống'),
            ngayKhoiChieu: Yup.string()
                .required('Vui lòng không để trống'),
            danhGia: Yup.number().required('Vui lòng không để trống').integer('Vui lòng nhập số nguyên'),
        }),
        onSubmit: (values) => {
            values.maNhom = 'GP03'
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }

            dispatch(actUpdateEditFilms(formData, navigate))
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
    const onChangeDate = (value) => {
        let ngayKhoiChieu = dayjs(value).format(dateFormat);
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
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
    const renderDatePicker = () => {
        if (formik.values.ngayKhoiChieu) {
            return <DatePicker defaultValue={dayjs(formik.values.ngayKhoiChieu)} onChange={onChangeDate} format={dateFormat} />
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
                size: componentSize
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
                validateStatus={formik.errors.tenPhim && formik.touched.tenPhim ? 'error' : ''}
                help={formik.errors.tenPhim && formik.touched.tenPhim && (formik.errors.tenPhim)}>
                <Input value={formik.values.tenPhim} name='tenPhim' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Trailer" hasFeedback
                validateStatus={formik.errors.trailer && formik.touched.trailer ? 'error' : ''}
                help={formik.errors.trailer && formik.touched.trailer && (formik.errors.trailer)}>
                <Input value={formik.values.trailer} name='trailer' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Mô tả" hasFeedback
                validateStatus={formik.errors.moTa && formik.touched.moTa ? 'error' : ''}
                help={formik.errors.moTa && formik.touched.moTa && (formik.errors.moTa)}>
                <Input value={formik.values.moTa} name='moTa' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu" >
                {renderDatePicker()}
            </Form.Item>
            <Form.Item label="Đang chiếu" >
                <Switch
                    checked={formik.values.dangChieu}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    onChange={handleOnchangeSwitch('dangChieu')}
                />
            </Form.Item>
            <Form.Item label="Sắp chiếu" >
                <Switch checked={formik.values.sapChieu}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    onChange={handleOnchangeSwitch('sapChieu')}
                />
            </Form.Item>
            <Form.Item label="Hot" >
                <Switch checked={formik.values.hot}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    onChange={handleOnchangeSwitch('hot')}
                />
            </Form.Item>
            <Form.Item label="Số sao" hasFeedback
                validateStatus={formik.errors.danhGia && formik.touched.danhGia ? 'error' : ''}
                help={formik.errors.danhGia && formik.touched.danhGia && (formik.errors.danhGia)}>
                <InputNumber value={formik.values.danhGia} onChange={handleInputNumber('danhGia')} min={0} max={10} />
            </Form.Item>
            <Form.Item label="Hình ảnh" >
                <input type='file' onChange={handleChangeFile} accept='image/png , image/jpg, image/jpeg' />

                <img width={100} height={100} src={imgSrc === '' ? dataEdit?.hinhAnh : imgSrc} alt="..." />
            </Form.Item>
            <Form.Item label="Tác vụ">
                <button className='btn btn-warning' type='submit'>Cập nhật phim</button>
            </Form.Item>
        </Form>
    )

}
