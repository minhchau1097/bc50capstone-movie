import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieTheater } from './duck/actions'
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';

export default function MovieTheater() {
  const { TabPane } = Tabs;
  const [state, setState] = useState({
    tabPosition: 'left'
  })
  const data = useSelector((state) => state.listMovieTheaterReducer.data)
  console.log(data)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieTheater())
  }, [])
  const renderMovieTheater = () => {
    return data?.map((item, index) => {
      return (
        <TabPane  tab={
          <div className='movie-theater-logo'>
            <img style={{ width: 50, height: 50 }} src={item.logo} alt={item.tenHeThongRap} /> </div>} key={index}
        >

          <Tabs tabPosition={state.tabPosition}  >
            {item.lstCumRap.map((item1, index) => {
              return (
                <TabPane tab={
                  <div className='text-left movie-theater-title ' style={{ width: 280,height:50 }}>
                    <p className='movie-theater-name'>{item1.tenCumRap}</p>
                    <p className='movie-theater-address'>{item1.diaChi}</p>
                  </div>
                } key={index} style={{ overflowY: 'scroll', flexGrow: 1, height: 720 }} >
                  {item1.danhSachPhim.map((item2, index) => {
                    return (

                      <div className={`d-flex  movie-theater-box  ${index >= 1 ? 'mt-4' : ''}`} key={index} >
                        <img src={item2.hinhAnh} alt={item2.tenPhim} style={{ width: 100, height: 130, borderRadius: 12 }} />
                        <div className='pl-4' style={{ width: 400 }}>
                          <p className='movie-theater-movie-name mb-1'><span>C18</span>{item2.tenPhim}</p>
                          <div className='movie-theater-movie-date '>{item2.lstLichChieuTheoPhim.map((item3, index) => {
                            if (index < 4) {
                              return <Link to={`/booking-ticket/${item3.maLichChieu}`} className='movie-date' key={index}>{item3.ngayChieuGioChieu}</Link>
                            } else {
                              return null;
                            }
                          })}</div>
                        </div>
                      </div>
                    )
                  })}
                </TabPane>

              )
            })}
          </Tabs>
        </TabPane>
      )
    })
  }

  return (
    <div className="container mb-5  ">
      <Tabs className='movie-theater' tabPosition={state.tabPosition} >
        {renderMovieTheater()}
      </Tabs>

    </div>
  )
}
