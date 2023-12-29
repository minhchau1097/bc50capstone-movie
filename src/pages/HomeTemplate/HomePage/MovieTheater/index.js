import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieTheater } from './duck/actions'
import { ConfigProvider, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
export default function MovieTheater() {
  const { TabPane } = Tabs;

  const data = useSelector((state) => state.listMovieTheaterReducer.data)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieTheater())
  }, [])
  const renderMovieTheater = () => {
    return data?.map((item, index) => {
      return (
        <TabPane tab={
          <div className='movie-theater-logo'>
            <img style={{ width: 50, height: 50 }} src={item.logo} alt={item.tenHeThongRap} /> </div>} key={index}
        >

          <Tabs tabPosition={'left'} style={{ height: 720 }} >
            {item.lstCumRap.map((item1, index) => {
              return (
                <TabPane tab={
                  <div className='text-left movie-theater-title ' style={{ width: 280, height: 50 }}>
                    <p className='movie-theater-name'>{item1.tenCumRap}</p>
                    <p className='movie-theater-address'>{item1.diaChi}</p>
                  </div>
                } key={index} style={{ flexGrow: 1, height: 720 }} className='hover:overflow-y-scroll transition-all' >
                  {item1.danhSachPhim.map((item2, index) => {
                    return (

                      <div className={`flex flex-row movie-theater-box  ${index >= 1 ? 'mt-4' : ''}`} key={index} >
                        <img src={item2.hinhAnh} alt={item2.tenPhim} style={{ width: 100, height: 130, borderRadius: 12 }} />
                        <div className='pl-4 w-[320px]'>
                          <p className='movie-theater-movie-name mb-3'><span>C18</span>{item2.tenPhim}</p>
                          <div className='movie-theater-movie-date'>{item2.lstLichChieuTheoPhim.slice(0, 4).map((item3, index) => {
                            return <Link to={`/booking-ticket/${item3.maLichChieu}`} className='movie-date' key={index}>{moment(item3.ngayChieuGioChieu).format('h:mmA')}</Link>
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
    <div className="bg-movie-theater">
      <div className="container">
        <ConfigProvider theme={{
          components: {
            Tabs: {
              
              inkBarColor: '#e4d804',
              itemSelectedColor: '#e4d804',
              itemHoverColor: '#e4d804',
              // itemActiveColor: '#e4d804'
            },
          },
        }}>

          <Tabs id='movie-theater' tabPosition={'left'} >
            {renderMovieTheater()}
          </Tabs>
        </ConfigProvider>

      </div>
    </div>
  )
}
