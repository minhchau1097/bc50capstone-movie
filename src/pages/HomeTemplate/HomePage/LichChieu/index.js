import React, { useState, useEffect } from 'react'
import LichChieuItem from "./LichChieuItem";
import Slider from "react-slick";
import { actFetchLichChieu, actFetchInfoHTRap, actGetCumRap } from './duck/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { Radio, Select, Space, Form, Input, DatePicker } from 'antd';



function LichChieu() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.lichChieuReducer.data);
  console.log("🚀 ~ file: index.js:13 ~ LichChieu ~ data:", data)
  const { heThongRapChieu } = useSelector((state) => state.lichChieuReducer);
  console.log("🚀 ~ file: index.js:15 ~ LichChieu ~ heThongRapChieu:", heThongRapChieu)

  //React-Slick
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
  //Call api list movie
  useEffect(() => {
    dispatch(actFetchLichChieu());
  }, []);
  //call api list movie bar
  useEffect(() => {
    dispatch(actFetchInfoHTRap());
  }, [])

  const renderListLichChieu = () => {
    return data?.map((movie) => <div key={movie.maPhim} ><LichChieuItem movie={movie} /></div>)
  };

  //Select antd

  const options = [];
  const handleChangeInfoFilms = (value) => {
    dispatch(actGetCumRap(value));
  };
  const onOk = (value) => {

  }
  const onChangeDate = (values) => {

  }
  return (
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
              <Form.Item>
                <Select options={options} onChange={handleChangeInfoFilms} placeholder="Chọn Phim" />
              </Form.Item>
            </Form>
          </div>
          <div className="under-line col-md-3 partition">
            <div className="form-group">
              <Form.Item>
                <Select options={heThongRapChieu?.map((htrap) => { return { label: htrap.tenHeThongRap, value: htrap.maHeThongRap } })} onChange={handleChangeInfoFilms} placeholder="Chọn Cụm Rạp" />
              </Form.Item>
            </div>
          </div>
          <div className="under-line col-md-3 partition">
            <div className="form-group">
              <Form.Item>
                <DatePicker className='w-full' showTime onChange={onChangeDate} onOk={onOk} placeholder="Chọn Ngày Giờ Chiếu" />
              </Form.Item>
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


