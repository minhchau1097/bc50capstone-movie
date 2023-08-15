import { UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons'
import { actLogout } from 'pages/AdminTemplate/LoginPage/duck/actions'
import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
export default function Navbar() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let isValid = true
  let name = ''
  if (localStorage.getItem( 'UserAdmin')) {
    isValid = false
    name = localStorage.getItem( 'UserAdmin') ? JSON.parse(localStorage.getItem( 'UserAdmin')) .hoTen : ''

  }else if(localStorage.getItem( 'Customer')){
    isValid = false
    name = localStorage.getItem( 'Customer') ? JSON.parse(localStorage.getItem( 'Customer')) .hoTen : ''
  }
  const handleLogout = () => {
    dispatch(actLogout(navigate))
  }
  return (


    <nav className="navbar navbar-expand-md  navbar-dark">
      <div className="container">
        {/* Brand */}
        <div className='navbar-custom'>

          <img id='logo' src="https://cybersoft.edu.vn/wp-content/uploads/2022/10/cyberlogo-white.png" alt="cybersoft" />

          
          {/* Toggler/collapsibe Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <NavLink
                  className='nav-link'
                  to="/"
                >
                  Lịch Chiếu
                </NavLink>
              </li>
              <li className="nav-item">
                <a
                  className='nav-link'
                  href="#movie-theater"
                  
                >
                  Cụm Rạp
                </a>
              </li>
              {isValid && (<li className="nav-item">
                <NavLink
                  className='nav-link'
                  to="/auth"
                >

                  <UserOutlined className='mr-1' />Đăng nhập
                </NavLink>
              </li>)}
              {isValid && (<li className="nav-item">
                <NavLink
                  className='nav-link'
                  to="/register"
                >
                  <UserAddOutlined className='mr-1' />Đăng ký
                </NavLink>
              </li>)}
              {!isValid && (<li className="nav-item customer-name">
                <NavLink
                  className="nav-link "
                  to="/"
                >
                  <UserOutlined className='mr-1' />{name}
                </NavLink>
                <ul className='name-menu'>
                  <li><UserOutlined className='mr-1'/><button>Thông tin cá nhân</button></li>
                  <li><LogoutOutlined className='mr-1'/><button onClick={handleLogout}>Đăng xuất</button></li>
                </ul>
              </li>)}
            </ul>

          </div>
      </div>
    </nav>
  )
}
