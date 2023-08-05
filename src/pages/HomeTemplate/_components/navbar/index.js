import { UserOutlined, UserAddOutlined   } from '@ant-design/icons'
import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Navbar() {
  return (


    <nav className="navbar navbar-expand-lg  navbar-dark">
      <div className="container">
        {/* Brand */}
        <div className='navbar-custom'>
          
            <img id='logo' src="https://cybersoft.edu.vn/wp-content/uploads/2022/10/cyberlogo-white.png" alt="cybersoft" />
         
          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item ">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "my-active nav-link" : "nav-link"
                  }
                  to="/"
                >
                  Lịch Chiếu
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "my-active nav-link" : "nav-link"
                  }
                  to="/about"
                >
                  Cụm Rạp
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "my-active nav-link" : "nav-link"
                  }
                  to="/auth"
                >
                  
                  <UserOutlined  className='mr-1'/>Đăng nhập
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "my-active nav-link" : "nav-link"
                  }
                  to="/register"
                >
                  <UserAddOutlined className='mr-1'/>Đăng ký
                </NavLink>
              </li>
            </ul>

          </div>
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
      </div>
    </nav>
  )
}
