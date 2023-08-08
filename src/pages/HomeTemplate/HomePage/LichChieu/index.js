import React, { useEffect } from 'react'
import LichChieuItem from "./LichChieuItem";
import Slider from "react-slick";
import Swal from 'sweetalert2';
import { actFetchLichChieu } from './duck/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function LichChieu() {
  const dispatch = useDispatch();
  const data = useSelector((state)=> state.lichChieuReducer.data);
  const param = useParams();
  console.log(param)
  
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
  }

  const handlePopUp = () => {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

  return (
    <div className='container'>
      <div className="titleLichChieu">
        <div className='row container'>
          <div className="under-line col-md-3">
            <div className="form-group">
              <select className="form-control" name="">
                <option>Phim</option>
                <option></option>
              </select>
            </div>
          </div>
          <div className="under-line col-md-3 partition">
            <div className="form-group">
              <select className="form-control" name="">
                <option>Rạp</option>
                <option></option>
                <option></option>
              </select>
            </div>
          </div>
          <div className="under-line col-md-3 partition">
            <div className="form-group">
              <select className="form-control" name="">
                <option>Ngày giờ chiếu</option>
                <option></option>
                <option></option>
              </select>
            </div>
          </div>
          <div className='col-md-3 partition'>
            {/* dùng sweet alert để hiện box */}
            <button className="btn btnMuaVe" onClick={() => {
              handlePopUp()
            }}>MUA VÉ NGAY</button>
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
