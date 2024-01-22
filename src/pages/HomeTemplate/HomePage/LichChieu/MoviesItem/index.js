import { PlayCircleOutlined } from '@ant-design/icons'
import { Rate } from 'antd'
import * as moment from 'moment'
import { fetchDetailMovie } from 'pages/HomeTemplate/DetailMoviePage/duck/actions'
import Trailer from 'pages/HomeTemplate/Trailer'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { Grid, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { DOMAIN_IMG } from 'utils/api'

export default function MoviesItem({ movies, param, status }) {
  const dispatch = useDispatch();
  const movieFilter = (item) => {
    return <SwiperSlide key={item.maPhim}>
      <div className="more-movies-card">
        <div className="more-movies-img">
          <div className="more-movies-overplay"></div>
          <Link to={`/detail/${item.maPhim}`} >
            <img src={`${DOMAIN_IMG + item.hinhAnh}`} alt={item.tenPhim} />
          </Link>
          <ul className='more-movies-menu'>
            <li>
              {/* Button trigger modal */}
              <button className='play-trailer' onClick={() => {
                dispatch({
                  type: 'OPEN_FORM',
                  data: <Trailer trailer={item.trailer} />,
                  open: true,
                })
              }}>Xem ngay
              </button>
            </li>
            <li>
              <Link to={`/detail/${item.maPhim}`} >Chi tiết</Link>
            </li>
          </ul>
        </div>
        <div className="more-movies-content">
          <Rate style={{ fontSize: 12 }} disabled allowHalf value={item && (item.danhGia / 2)} />
          <Link className='h-[50px]' to={`/detail/${item.maPhim}`} >{item.tenPhim}</Link>
          <p>
            <div className='flex justify-start gap-[8px] px-[15px]'>
              <span className='text-[12px] font-bold bg-red-500 p-[4px] rounded-[6px] text-white'>T18</span><span className='text-[12px] font-bold bg-mainColor p-[4px] rounded-[6px] text-white'>2D</span>
            </div>
          </p>
        </div>
      </div>
    </SwiperSlide>
  }
  const renderMovies = () => {
    if (param != '') {
      return movies.data?.filter(movie => movie.maPhim != param.id).map(item => {
        return (
          <SwiperSlide key={item.maPhim}>
            <div className="more-movies-card">
              <div className="more-movies-img">
                <div className="more-movies-overplay"></div>
                <a href={`${item.maPhim}`} >
                  <img src={`${DOMAIN_IMG + item.hinhAnh}`} alt={item.tenPhim} />
                </a>
                <ul className='more-movies-menu'>
                  <li>
                    <button className='play-trailer' onClick={() => {
                      dispatch({
                        type: 'OPEN_FORM',
                        data: <Trailer trailer={item.trailer} />,
                        open: true,
                      })
                    }}>Xem ngay
                    </button>
                  </li>
                  <li>
                    <Link to={`/detail/ ${item.maPhim}`} onClick={()=>{
                      dispatch(fetchDetailMovie(item.maPhim))
                    }}>Chi tiết</Link>
                  </li>
                </ul>
              </div>
              <div className="more-movies-content">
                <Rate style={{ fontSize: 12 }} disabled allowHalf value={item && (item.danhGia / 2)} />
                <a href={`${item.maPhim}`}>{item.tenPhim}</a>
                <p>Hot</p>
              </div>
            </div>
          </SwiperSlide>
        )
      })
    } else {
      return movies.data?.map(item => {
        if (status.hot && item.hot == status.hot) return movieFilter(item)
        if (status.dangChieu && item.dangChieu == status.dangChieu) return movieFilter(item)
        if (status.sapChieu && item.sapChieu == status.sapChieu) return movieFilter(item)
      })
    }
  }

  return (
    <Swiper
      spaceBetween={40}
      breakpoints={{
        400: {
          slidesPerView: 1
        },
        640: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 2
        },
        1200: {
          slidesPerView: 4
        }

      }}
      grid={{
        rows: 1,


      }}
      pagination={{
        dynamicBullets:true ,
        clickable:true
      }}
      modules={[Grid,Pagination]}
    >
      {renderMovies()}

    </Swiper>
  )
}
