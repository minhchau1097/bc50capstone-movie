import React, { useState, useEffect } from 'react'
import LichChieuItem from "./LichChieuItem";
import Slider from "react-slick";
import { actFetchLichChieu, actFetchInfoCumRap, actNgayGioChieu } from './duck/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Select, Form, Tabs, } from 'antd';
import Swal from 'sweetalert2';
import Search from './../../../../assets/images/search.png';
import MoviesItem from './MoviesItem';


function LichChieu() {
  const [maPhim, setMaPhim] = useState('');
  const [state, setState] = useState([]);
  const [status, setStatus] = useState({
    hot: true,
    sapChieu: false,
    dangChieu: false,
    bgColor: '#e4d804',
    text: 'chiếu rạp'
  });
  const [maLichChieu, setMaLichChieu] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.lichChieuReducer);
  const { cumRap, ngayGioChieu } = useSelector((state) => state.lichChieuReducer);



  //Call api list movie
  useEffect(() => {
    dispatch(actFetchLichChieu());
  }, []);
  const renderListLichChieu = () => {
    return <MoviesItem movies={movies} param={''} status={status} />
  };

  //Select antd

  const handleChangeInfoFilms = (value) => {
    dispatch(actFetchInfoCumRap());
    setMaPhim(value);
  };

  const handleChangeInfoCumRap = (value) => {
    console.log("🚀 ~ file: index.js:76 ~ handleChangeInfoCumRap ~ value:", value)
    if (value) {
      let realList = [];
      const cumRap = ngayGioChieu?.heThongRapChieu.map((item) => item)
      const heThong = cumRap.filter((item) => item.maHeThongRap === value)
      heThong?.map((item) => item.cumRapChieu.map((item1) => item1.lichChieuPhim.map((item2) => realList.push(item2))))
      setState({
        state: realList
      })
    }
  }
  const onChangeDate = (value) => {
    setMaLichChieu(value);
  }
  const handleMLC = () => {
    if (maLichChieu) {
      navigate(`/booking-ticket/${maLichChieu}`);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'CHỌN PHIM ĐI BA LỌI',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }

  }

  return (
    <div className='bg-lichchieu'>
      <div className='container'>
        <div className="titleLichChieu">
          <div className='row container'>
            <div className="under-line col-md-3">
              <Form
                className='form-group'
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 24,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
              >
                <Form.Item style={{ color: '#fff', backgroundColor: '#000' }}>
                  <Select options={movies.data?.map((movie) => { return { label: movie.tenPhim, value: movie.maPhim } })} onChange={handleChangeInfoFilms} placeholder="Chọn Phim" />
                </Form.Item>
              </Form>
            </div>
            <div className="under-line col-md-3 partition">
              <div className="form-group">
                <Form.Item>
                  <Select options={cumRap?.map((cr) => {
                    return {
                      label: cr.tenHeThongRap,
                      value: cr.maHeThongRap
                    }
                  })} onChange={handleChangeInfoCumRap} onClick={() => {
                    dispatch(actNgayGioChieu(maPhim));
                  }} placeholder="Chọn Cụm Rạp" />
                </Form.Item>
              </div>
            </div>
            <div className="under-line col-md-3 partition">
              <div className="form-group">
                <Form.Item>
                  <Select className='w-full' options={state.state?.map((item) => {
                    let ngayChieuGioChieu = moment(item.ngayChieuGioChieu).format('hh:mm A - DD/MM/YYYY')
                    return { label: ngayChieuGioChieu, value: item.maLichChieu }
                  })} onChange={onChangeDate} placeholder="Chọn Ngày Giờ Chiếu" />
                </Form.Item>
              </div>
            </div>
            <div className='col-md-3 partition'>
              {/* dùng sweet alert để hiện box */}
              <Form.Item>
                <button onClick={handleMLC} className="btn btnMuaVe">MUA VÉ NGAY</button>
              </Form.Item>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-sm navbar-dark nav-search container" style={{ width: "85%" }} >
          <form className="form-inline">
            <div className="row w-100">
              <div className="col-10">
                <input className="input-search form-control mr-sm-2" type="text" placeholder="Search Movie" style={{ border: "none" }} /></div>
              <div className="col-2">
                <img className='img-search img-fluid' src={Search} alt="image-search" />
              </div>
            </div>
          </form>
        </nav>
        <div className='max-lg:flex max-lg:flex-col max-lg:items-center'>
          <span className='text-textColor uppercase text-[12px] font-bold'>Phim {status.text}</span>
          <div className='flex justify-between max-lg:flex-col max-lg:items-center'>
            <div>

              <h3 className='max-lg:before:left-0 max-lg:before:right-0 max-lg:before:mx-auto max-lg:mb-[40px]'>Phim mới</h3>
            </div>
            <ul className='flex gap-4 mb-0 '>
              <li className={` max-sm:px-[20px] py-[12px] px-[28px] rounded-[8px] bg-bgColor text-gray-400 inline-block mb-20 text-[12px] font-bold border-[1px] border-[#2d303d] cursor-pointer ${status.hot ? 'text-white !border-mainColor' : ''}`} onClick={() => {
                setStatus({ hot: true, text: 'hot' })
              }}>Hot</li>
              <li className={` max-sm:px-[20px] py-[12px] px-[28px] rounded-[8px] bg-bgColor text-gray-400 inline-block mb-20 text-[12px] font-bold border-[1px] border-[#2d303d] cursor-pointer ${status.dangChieu ? 'text-white !border-mainColor' : ''}`} onClick={() => {
                setStatus({ dangChieu: true, text: 'đang chiếu' })
                // renderListLichChieu()
              }}>Đang chiếu</li>
              <li className={` max-sm:px-[20px] py-[12px] px-[28px] rounded-[8px] bg-bgColor text-gray-400 inline-block mb-20 text-[12px] font-bold border-[1px] border-[#2d303d] cursor-pointer ${status.sapChieu ? 'text-white !border-mainColor' : ''}`} onClick={() => {
                setStatus({ sapChieu: true, text: 'sắp chiếu' })
              }}>Sắp chiếu</li>
            </ul>
          </div>
        </div>
        {renderListLichChieu()}
      </div>
    </div>

  )
}

export default LichChieu;


