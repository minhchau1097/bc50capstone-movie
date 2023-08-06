import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieTheater } from './duck/actions'
import { Tabs } from 'antd';
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
        <TabPane tab={<img style={{ width: 80, height: 80 }} src={item.logo} alt={item.tenHeThongRap} />} key={index}>
          <Tabs tabPosition={state.tabPosition} >
            {item.lstCumRap.map((item1, index) => {
              return (
                <TabPane  tab={
                  <div className='d-flex'>
                    <img src={item1.hinhAnh} alt={item1.tenCumRap} style={{ width: 60 }} />
                    <div className='d-flex flex-col text-left w-50'>
                      <p>{item1.tenCumRap}</p>
                      <p>{item1.diaChi}</p>
                    </div>
                  </div>
                } key={index}>

                  {item1.danhSachPhim.map((item2, index) => {
                    // if (item2.length < 4) {
                    return (
                      <div className={`d-flex ${index >= 1 ? 'mt-4' : ''}`} key={index}>
                        <img src={item2.hinhAnh} alt={item2.tenPhim} style={{ width: 60 }} />

                        <p>{item2.tenPhim}</p>


                      </div>

                    )
                    // }
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
    <div className="container pb-5">
      <Tabs tabPosition={state.tabPosition}>
        {renderMovieTheater()}
      </Tabs>
    </div>
  )
}
