import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/type';
import { NotificationType, User } from 'type/type';
import * as Yup from "yup";
import { actDetailUser } from '../duck/action';
import { actClearNote, actUpdateDetailUser } from './duck/action';
import { Breadcrumb, Skeleton, notification } from 'antd';
import Loader from 'Loader';


export default function EditInfor() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { state } = useAppSelector(state => state.detailUserReducer);
    const data = useAppSelector(state => state.UpdateDetailUserReducer);
    const [status, setStatus] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        if(localStorage.getItem('USER_CUSTOMER')){
            dispatch(actDetailUser())
        }else{
            navigate('/auth',{replace:false})
        }
        return () => {
            dispatch(actClearNote())
        }
    }, [])
    useEffect(() => {
        if (data.data) {
            openNotification('Cập nhật thành công', 'success')

            setTimeout(() => {

                navigate('/thong-tin-ca-nhan', { replace: false })
            }, 1000)
        } else if (data.error) {
            openNotification('Cập nhật thất bại', 'error')
            setTimeout(() => {

                navigate('/thong-tin-ca-nhan', { replace: false })
            }, 1000)
        }
    }, [data.data || data.error])
  
    const openNotification = (value: string, type: NotificationType) => {
        api[type]({
            message: 'Thông báo',
            description: value,
            placement: 'bottomRight',
        });

    }
    const formik: FormikProps<User> = useFormik<User>({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: state.data?.taiKhoan || '',
            matKhau: state.data?.matKhau || '',
            hoTen: state.data?.hoTen || '',
            soDT: state.data?.soDT || '',
            maLoaiNguoiDung: state.data?.maLoaiNguoiDung || '',
            maNhom: state.data?.maNhom || '',
            email: state.data?.email || '',
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Vui lòng không để trống').min(5, 'Tối thiểu 5 ký tự'),
            matKhau: Yup.string().required('Vui lòng không để trống').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Tối thiểu 8 ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt'),
            hoTen: Yup.string().required('Vui lòng không để trống').min(5, 'Tối thiểu 5 ký tự'),
            email: Yup.string().required('Vui lòng không để trống'),
            soDT: Yup.string()
                .required('Vui lòng không để trống').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Số điện thoại không hợp lệ').max(11, 'Số điện thoại không hợp lệ'),
        }),
        onSubmit: (values) => {

            dispatch(actUpdateDetailUser(values, navigate))

        }
    });

    if(state.loading) return <Loader color={'#f6ba35'}  value={50} />
    return (
        <>
            {contextHolder}
            <section className='infor-user' style={{ backgroundColor: '#eee', minHeight: '100vh' }}>
                <div className="px-[50px] py-5">
                    <Breadcrumb className='mb-4 card-blur p-2'
                        items={[
                            {
                                title:
                                    <Link to={'/'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg></Link>
                                ,
                            },
                            {
                                title: (

                                    <Link className='!flex items-center' to={'/thong-tin-ca-nhan'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                        Thông tin cá nhân
                                    </Link>


                                ),
                            }, {
                                title: (

                                    <div className='flex  items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>

                                        <span>Chỉnh sửa </span>

                                    </div>

                                ),
                            }
                        ]}
                    />

                    <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16 bg-white rounded-[8px]">
                        <h2 className="mb-4 text-xl font-bold text-gray-900  text-center">Chỉnh sửa thông tin</h2>
                        <form action="#" onSubmitCapture={formik.handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                <div className="w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Tài khoản</label>
                                    <input type="text" name="taiKhoan" className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5  cursor-no-drop" value={formik.values.taiKhoan} disabled />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Mã nhóm</label>
                                    <select name='maNhom' className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 cursor-no-drop " disabled value={formik.values.maNhom} >
                                        <option value="GP01">GP01</option>
                                        <option value="GP02">GP02</option>
                                        <option value="GP03">GP03</option>
                                        <option value="GP04">GP04</option>
                                        <option value="GP05">GP05</option>
                                        <option value="GP06">GP06</option>
                                        <option value="GP07">GP07</option>
                                        <option value="GP08">GP08</option>
                                        <option value="GP09">GP09</option>
                                    </select>
                                </div>
                                <div className="w-full relative">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Mật khẩu</label>
                                    <input type={!status ? 'password' : 'text'} name="matKhau" className={`bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 ${formik.errors.matKhau && formik.touched.matKhau && ('  !border-[rgba(240,23,23,.835)]')}`} value={formik.values.matKhau} onChange={formik.handleChange} />
                                    {formik.errors.matKhau && formik.touched.matKhau && (<div className=' w-full text-[rgba(240,23,23,.835)]'>
                                        <p>{formik.errors.matKhau}</p>
                                    </div>)}
                                    {!status && (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-[6px] top-9 transition-opacity delay-150" onClick={() => {
                                        setStatus(true)
                                    }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>)}
                                    {status && (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-[6px] top-9 transition-opacity delay-150" onClick={() => {
                                        setStatus(false)
                                    }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>)}


                                </div>
                                <div className="w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Họ tên</label>
                                    <input type="text" name="hoTen" className={`bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 ${formik.errors.hoTen && formik.touched.hoTen && ('  !border-[rgba(240,23,23,.835)]')}`} value={formik.values.hoTen} onChange={formik.handleChange} />
                                    {formik.errors.hoTen && formik.touched.hoTen && (<div className=' w-full text-[rgba(240,23,23,.835)]'>
                                        <p>{formik.errors.hoTen}</p>
                                    </div>)}
                                </div>
                                <div className="w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Số điện thoại</label>
                                    <input type="text" name="soDT" className={`bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 ${formik.errors.soDT && formik.touched.soDT && ('  !border-[rgba(240,23,23,.835)]')}`} value={formik.values.soDT} onChange={formik.handleChange} />
                                    {formik.errors.soDT && formik.touched.soDT && (<div className=' w-full text-[rgba(240,23,23,.835)]'>
                                        <p>{formik.errors.soDT}</p>
                                    </div>)}
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                    <input type="email" name="email" className={`bg-gray-50 border-[1px] border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 ${formik.errors.email && formik.touched.email && ('  !border-[rgba(240,23,23,.835)]')}`} value={formik.values.email} onChange={formik.handleChange} />
                                    {formik.errors.email && formik.touched.email && (<div className=' w-full text-[rgba(240,23,23,.835)]'>
                                        <p>{formik.errors.email}</p>
                                    </div>)}
                                </div>

                            </div>
                            <div className="flex items-center space-x-4">
                                <button type='button' className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-[20px] py-[10px] text-center " onClick={() => {
                                    navigate('/thong-tin-ca-nhan', { replace: true })
                                }}>
                                    Quay lại
                                </button>
                                <button disabled={data.data || data.error} type="submit" className="text-green-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-[20px] py-[10px] text-center " >
                                    Cập nhật
                                </button>

                            </div>
                        </form>
                    </div>


                </div>
            </section>
        </>
    )

}
