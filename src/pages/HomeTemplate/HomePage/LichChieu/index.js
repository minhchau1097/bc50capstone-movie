import React, { useState, useEffect } from 'react'
import LichChieuItem from "./LichChieuItem";
import Slider from "react-slick";
import { actFetchLichChieu, actFetchInfoCumRap, actNgayGioChieu } from './duck/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Select, Form, } from 'antd';
import Swal from 'sweetalert2';
import Search from './../../../../assets/images/search.png';


function LichChieu() {
  const [maPhim, setMaPhim] = useState('');
  const [state, setState] = useState([]);
  const [maLichChieu, setMaLichChieu] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.lichChieuReducer.data);
  const { cumRap, ngayGioChieu } = useSelector((state) => state.lichChieuReducer);

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

  const renderListLichChieu = () => {
    return data?.map((films) => <div key={films.maPhim} ><LichChieuItem films={films} /></div>)
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
                <Form.Item style={{color:'#fff',backgroundColor:'#000'}}>
                  <Select  options={data?.map((movie) => { return { label: movie.tenPhim, value: movie.maPhim } })} onChange={handleChangeInfoFilms} placeholder="Chọn Phim" />
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
        <Slider {...settings}>
          {renderListLichChieu()}
        </Slider>
      </div>
    </div>
  )
}

export default LichChieu;


