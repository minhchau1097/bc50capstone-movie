import { ConfigProvider, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { actEditPersonalInfo, actFetchPersonalInfo } from '../duck/actions';
// import { Animate, DetailUser } from 'type/type';
import * as Yup from "yup"
import { useDispatch, useSelector } from 'react-redux';
export default function CardItem({ item }) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { dataEdit } = useSelector((state) => state.personalInfoReducer)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [form] = Form.useForm();
    useEffect(() => {
        if (dataEdit) {
            alert('Cập nhật thành công')
            setOpen(false)
            dispatch(actFetchPersonalInfo())
        }
    }, [dataEdit])
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const onSubmitForm = (values) => {
        // dispatch(actFetchPersonalInfo(newValues));
        dispatch(actEditPersonalInfo({ ...values, loaiNguoiDung: 'customer' }));

    }
    const yupSync = {
        async validator({ field }, value) {
            await schema.validateSyncAt(field, { [field]: value });
        },
    };
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Tối thiểu 8 ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt')
    const schema = Yup.object().shape({
        taiKhoan: Yup.string().required('Vui lòng không để trống').min(5, 'Tối thiểu 5 ký tự'),
        matKhau: Yup.string().required('Vui lòng không để trống'),
        hoTen: Yup.string().required('Vui lòng không để trống').min(5, 'Tối thiểu 5 ký tự'),
        email: Yup.string().email('Email không hợp lệ').required('Vui lòng không để trống'),
        soDt: Yup.string()
            .required('Vui lòng không để trống').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Số điện thoại không hợp lệ').max(11, 'Số điện thoại không hợp lệ'),
    })
    const initialValues = {
        hoTen: "",
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
    }

    return (
        <>

            <Modal
                title="Chỉnh sửa"
                open={open}
                onOk={false}
                footer={null}
                destroyOnClose
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                bodyStyle={{ marginTop: '24px' }}
                className='font-semibold'
            >
                <ConfigProvider
                    theme={{
                        token: {
                            colorText: '#1e1b29'

                        },
                    }}
                >
                    <Form
                        form={form}
                        onFinish={onSubmitForm}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                        initialValues={item ? item : initialValues}
                        // onValuesChange={onFormLayoutChange}
                        // size={componentSize}
                        className='max-w-[600px] '

                    >
                        <Form.Item label="Họ Tên" name='hoTen' rules={[yupSync]} >
                            <Input className='text-textColor' placeholder='Nhập họ tên' />
                        </Form.Item>
                        <Form.Item label="Tài Khoản" name='taiKhoan' rules={[yupSync]}>
                            <Input className='text-textColor' placeholder='Nhập ID tài khoản' disabled={true} />
                        </Form.Item>
                        <Form.Item label="Mật Khẩu" name='matKhau' rules={[yupSync]} >
                            <Input className='text-textColor' placeholder='Nhập mật khẩu' />
                        </Form.Item>
                        <Form.Item label="Email" name='email' rules={[yupSync]}>
                            <Input className='text-textColor' placeholder='Nhập email' />
                        </Form.Item>
                        <Form.Item label="Số Điện Thoại" name='soDt' rules={[yupSync]}>
                            <Input className='text-textColor' placeholder='Nhập số điện thoại' />
                        </Form.Item>
                        <div className='flex justify-end'>

                            <button type='submit' className=' p-2 px-3 rounded-lg bg-mainColor text-titleColor shadow-md hover:border-mainColor hover:bg-white border-[1px]  hover:shadow-none'>Cập nhật</button>
                        </div>




                    </Form>
                </ConfigProvider>
            </Modal >

            <div>
                <div className=" mb-4 rounded-[8px] " style={{boxShadow:'0px 1px 7px 0px rgba(0, 0, 0, 0.46)'}} >
                    <div className="card-body text-center bg-bgForm">
                        <div className='font-semibold'>

                            <span className='inline-block'> <img className='w-[60px] h-[60px] rounded-full object-cover' src='	https://demo2.cybersoft.edu.vn/static/media/instrutor10.89946c43.jpg' alt='logo' /></span>
                            <h5 className="my-3 text-white">{item?.hoTen}</h5>
                            <p className="text-muted mb-1">{item?.soDt}</p>
                            <p className="text-muted mb-4">{item?.email}</p>
                        </div>

                        <div className="d-flex justify-content-center mb-2">
                            <button className="!border-mainColor  font-semibold border-[1px]  p-[12px] rounded-[8px] bg-titleColor text-[#fff] hover:bg-mainColor hover:text-titleColor" onClick={() => {
                                showModal()
                            }}>
                                Chỉnh sửa</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
