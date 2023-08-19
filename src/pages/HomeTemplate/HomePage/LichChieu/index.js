import React, { useState, useEffect } from 'react'
import LichChieuItem from "./LichChieuItem";
import Slider from "react-slick";
import { actFetchLichChieu } from './duck/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { Radio, Select, Space } from 'antd';

function LichChieu() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.lichChieuReducer.data);
  const dataMovie = useSelector((state) => state.listMovieTheaterReducer.data);
  console.log("🚀 ~ file: index.js:13 ~ LichChieu ~ dataMovie:", dataMovie)
  const param = useParams();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 4,
    arrows: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesPerRow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesPerRow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 599,
        settings: {
          slidesPerRow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  useEffect(() => {
    dispatch(actFetchLichChieu());
  }, []);

  const renderListLichChieu = () => {
    return data?.map((movie) => <div key={movie.maPhim} ><LichChieuItem movie={movie} /></div>)
  };

  //Select antd
  // dataMovie?.map((movie) => movie.lstCumRap.map((movie) => movie.danhSachPhim.map((movie) => movie.tenPhim)))
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };
  const [size, setSize] = useState({
    maLichChieu: "",
    maRap: "",
    ngayChieuGioChieu: "",
  });

  return (
    <div className='container'>
      <div className="titleLichChieu">
        <div className='row container'>
          <div className="under-line col-md-3">
            <div className="form-group">
              <Select
                className='mb-2'
                size={size}
                defaultValue="Phim"
                onChange={handleChange}
                style={{
                  width: 240,
                }}
                options={options}
              />
            </div>
          </div>
          <div className="under-line col-md-3 partition">
            <div className="form-group">
              <Select
                size={size}
                defaultValue="a1"
                onChange={handleChange}
                style={{
                  width: 240,
                }}
                options={options}
              />
              {/* <select className="form-control" name="maHeThongRap"  onChange={(e) => handleOnchange(e)}>
                <option>Rạp</option>
                {dataMovie?.map((movie, index) => <option key={index}>
                  {movie.maHeThongRap}
                </option>)}
              </select> */}
            </div>
          </div>
          <div className="under-line col-md-3 partition">
            <div className="form-group">
              <Select
                size={size}
                defaultValue="a1"
                onChange={handleChange}
                style={{
                  width: 240,
                }}
                options={options}
              />
              {/* <select className="form-control" name="ngayChieuGioChieu" onChange={(e) => handleOnchange(e)}>
                <option>Ngày giờ chiếu</option>
                {dataMovie?.map((movie) => movie.lstCumRap.map((movie) => movie.danhSachPhim.map((movie) => movie.lstLichChieuTheoPhim.map((movie, index) => <option key={index}>
                  {moment(movie.ngayChieuGioChieu).format('hh:mm A -') + moment(movie.ngayChieuGioChieu).format(' DD-MM-YYYY')}
                </option>))))}
              </select> */}
            </div>
          </div>
          <div className='col-md-3 partition'>
            {/* dùng sweet alert để hiện box */}
            <Link to={`/booking-ticket/`} className="btn btnMuaVe">MUA VÉ NGAY</Link>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-sm navbar-dark nav-search container" style={{ width: "85%" }} >
        <form className="form-inline">
          <div className="row w-100">
            <div className="col-10">
              <input className="input-search form-control mr-sm-2" type="text" placeholder="Search Movie" style={{ border: "none" }} /></div>
            <div className="col-2">
              <img className='img-search img-fluid' src="./images/search.png" alt="image-search" />
            </div>
          </div>
        </form>
      </nav>
      <Slider {...settings}>
        {renderListLichChieu()}
      </Slider>
      <div className='container mt-5'>
        <img src="./images/shadow.png" alt="" width={1080} />
      </div>
    </div>
  )
}

export default LichChieu;
