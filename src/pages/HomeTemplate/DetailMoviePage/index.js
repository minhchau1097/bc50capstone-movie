import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDetailMovie } from './duck/actions'
import Trailer from '../Trailer'
import { PlayCircleOutlined } from '@ant-design/icons'
import { Rate, Tabs } from 'antd'
import moment from 'moment/moment'
import { styled } from 'styled-components'
import Loader from 'Loader'



export default function DetailMoviePage() {

  useEffect(() => {
    window.scrollTo(0, 0)
  })
  const param = useParams()
  const {data,loading} = useSelector((state) => state.detailMovieReducer)
  const dispatch = useDispatch();
  const [tabPosition, setTabPosition] = useState('left');
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('Customer')) {
      setStatus(true)
    }
    dispatch(fetchDetailMovie(param.id))

  }, [])
  const Wrapper = styled.section`
    background-image: url(${data && data.hinhAnh});
    background-position: top;
    background-size: cover;
    min-height: 100vh;
`;
if(loading) return <Loader value={50}></Loader>
  const checkData = () => {
    if (data?.heThongRapChieu.length === 0) {
      return <div className='text-center '>
        <h2 style={{ paddingTop: 60 }}>Xin lỗi quý khách , hiện tại chưa có lịch chiếu</h2>
      </div>


    } else {
      return renderTabs()
    }
  }
  const renderTabs = () => {
    let items = data?.heThongRapChieu.map((item, index) => {
      return {
        key: index,
        label: (
          <div key={index} className='theater-logo'>
            <img src={item.logo} alt={item.tenHeThongRap} title={item.tenHeThongRap} />

          </div>
        ),
        children: (
          <>
            {item.cumRapChieu.map((item1, index) => {
              return (
                <div key={index} className='theater-title'>
                  <div>
                    <p >{item1.tenCumRap}</p>
                    <p>{item1.diaChi}</p>
                  </div>
                  <div key={index} className=' mt-2 theater-movie-date' >
                    {item1.lichChieuPhim.map((item2, index) => {
                      return (
                        <Fragment key={index}>
                          <Link to={`/booking-ticket/${item2.maLichChieu}`} className='movie-date' >{moment(item2.ngayChieuGioChieu).format('h:mmA')}</Link>

                        </Fragment>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </>
        )
      }
    })
    return (
      <Tabs tabPosition={tabPosition} defaultActiveKey='1' items={items} className='detail-movie-theater'>
      </Tabs>
    )

  }

  return (
    <Wrapper >
      <div className='card-blur' >
        <div className="container " style={{ padding: '100px 0' }}>
          <div className='detail-movie'>
            <div className='row h-100 detail-movie-content'>
              <div className="col-12  col-md-6  ">
                <div className="detail-movie-left mx-auto mx-md-0">
                  <img className=' mr-auto' style={{ height: 400, width: '100%' }} src={data && data.hinhAnh} alt="" />
                  {/* Button trigger modal */}
                  <button className='play-trailer' type="button" onClick={() => {
                    dispatch({
                      type: 'OPEN_FORM',
                      data: <Trailer trailer={data?.trailer} />,
                      open: true,
                    })
                  }}>
                    <PlayCircleOutlined className='d-block' />
                  </button>
                </div>
              </div>
              <div className="col-12  col-md-6 mt-5  mt-md-0 detail-movie-right">
                <p>Ngày khởi chiếu :{moment(data && data.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                <h3 className='mt-3'>{data && data.tenPhim}</h3>
                <p className='mt-3'>{data && data.moTa}</p>
                <div className='d-flex justify-content-start  align-items-baseline mt-4'>
                  <Rate disabled allowHalf value={data && (data.danhGia / 2)} /> <span className='ml-2'>{data && data.danhGia}/10</span>
                  <a href='#detail-movie-theater' className='btn btn-danger ml-3 ml-sm-5'>Mua vé</a>
                </div>
              </div>
              <div className="row w-100 mx-auto ">
                <div className='background-detail-movie-theater col-12'>
                  <div id='detail-movie-theater' >
                    {checkData()}

                  </div>
                </div>
              </div>
              <div className='row w-100 mx-auto' >
                <div className='col-12'>
                  <div className='detail-movie-comments'>
                    <div className='p-4'>
                      <p>Bình luận</p>
                      {status ? (
                        <form className='d-flex mt-2 items-start ' onSubmit={(e) => {
                          e.preventDefault()
                          console.log(e.target[0].value)
                        }}>

                          <textarea style={{backgroundColor:'#100f0fb8'}} name="" id="" className='w-100   p-2 rounded' onChange={(e) => {
                            // console.log(e.target.value)
                          }} placeholder='Nhập bình luận tại đây'></textarea>
                          <button type='submit' className='btn btn-danger ml-2'>Gửi</button>
                        </form>
                      ) : (
                        <div className='text-center'>
                          <Link to={'/auth'} className='btn btn-primary'>Đăng nhập để bình luận</Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Wrapper>
  )
}
