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
        <TabPane tab={<img style={{ width: 60, height: 60 }} src={item.logo} alt={item.tenHeThongRap} />} key={index}>
          <Tabs tabPosition={state.tabPosition}  >
            {item.lstCumRap.map((item1, index) => {
              return (
                <TabPane tab={
                  <div className='d-flex flex-col text-left ' style={{ width: 280 }}>
                    <p>{item1.tenCumRap}</p>
                    <p className='movie-theater-address'>{item1.diaChi}</p>
                  </div>
                } key={index} >
                  {item1.danhSachPhim.map((item2, index) => {
                    return (

                      <div className={`d-flex pt-4 ${index >= 1 ? 'mt-4' : ''}`} key={index} style={{ width: 400 }} >
                        <img src={item2.hinhAnh} alt={item2.tenPhim} style={{ width: 100 ,height:130}} />
                        <div className='pl-4'>
                          <p>{item2.tenPhim}</p>
                          <div className='d-flex'>{item2.lstLichChieuTheoPhim.map((item3, index) => {
                            if (index < 3) {
                              return <Link to={`/booking-ticket/${item3.maLichChieu}`} key={index}>{item3.ngayChieuGioChieu}</Link>
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
    <div className="container pb-5 movie-theater ">
      <Tabs className='border' tabPosition={state.tabPosition} style={{ overflowY: 'scroll' }}>
        {renderMovieTheater()}
      </Tabs>

    </div>
  )
}
