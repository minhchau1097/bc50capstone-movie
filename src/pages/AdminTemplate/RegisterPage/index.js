import React, { useState } from 'react';
import { actRegister } from './duck/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function RegisterPage() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.registerReducer.error);
  const navigate = useNavigate();
  const [state, setState] = useState({
    hoTen: "",
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP03",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actRegister(state, navigate));
  }

  const renderError = () => {
    return <div className='alert alert-danger'>{error?.response.data.content}</div>
  }

  return (
    <div className='container'>
      <h3 className='text-center '>Đăng Ký</h3>
      <div className="row ">
        <div className="col-md-6 col-lg-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="card  mt-3">
              <div className="card-body " >
                <div className="form-group">
                  <label>Họ Tên</label>
                  <input type="text" name='hoTen' className="form-control" onChange={handleOnchange} />
                </div>
                <div className="form-group">
                  <label>Tên đăng nhập</label>
                  <input type="text" name='taiKhoan' className="form-control" onChange={handleOnchange} />
                </div>
                <div className="form-group">
                  <label>Mật khẩu</label>
                  <input type="text" name='matKhau' className="form-control" onChange={handleOnchange} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="text" name='email' className="form-control" onChange={handleOnchange} />
                </div>
                <div className="form-group">
                  <label>Số Điện Thoại</label>
                  <input type="text" name='soDt' className="form-control" onChange={handleOnchange} />
                </div>
                {error && renderError()}
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20 }}>
                  <button className='btn btn-success' >Đăng Ký</button>
                  <button className='btn btn-danger'>Huỷ</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
