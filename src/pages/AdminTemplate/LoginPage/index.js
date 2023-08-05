import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actAuth } from './duck/actions'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.loginReducer.error)
  const navigate = useNavigate()
  const [state, setState] = useState({
    taiKhoan: '',
    matKhau: '',
  })
  const handleOnchange = (e) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
    console.log(name, value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(actAuth(state, navigate))
  }
  const renderError = () => {
    return (
      error && (
        <div className='alert alert-danger'>{error}</div>
      )
    )
  }
  return (
    <div className='container'>
      <h3 className='text-center '>Đăng nhập</h3>
      <div className="row ">
        <div className="col-md-6 col-lg-6 mx-auto">
          {renderError()}
          <form onSubmit={handleSubmit}>

            <div className="card  mt-5">
              <div className="card-body " >
                <div className="form-group">
                  <label>Tên đăng nhập</label>
                  <input type="text" name='taiKhoan' className="form-control" onChange={handleOnchange} />
                </div>
                <div className="form-group">
                  <label>Mật khẩu</label>
                  <input type="text" name='matKhau' className="form-control" onChange={handleOnchange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 60 }}>
                  <button className='btn btn-danger'>Huỷ</button>
                  <button className='btn btn-success' >Đăng nhập</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
