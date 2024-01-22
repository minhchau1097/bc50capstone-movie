import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDetailMovie, getComments, postComment } from './duck/actions'
import Trailer from '../Trailer'
import { PlayCircleOutlined } from '@ant-design/icons'
import { ConfigProvider, Rate, Tabs } from 'antd'
import moment from 'moment/moment'
import Loader from 'Loader'
import { DOMAIN_IMG } from 'utils/api'
import { actFetchLichChieu } from '../HomePage/LichChieu/duck/actions'
import MoviesItem from '../HomePage/LichChieu/MoviesItem'



export default function DetailMoviePage() {


  const param = useParams()
  const { data, loading, comment } = useSelector((state) => state.detailMovieReducer)
  const movies = useSelector((state) => state.lichChieuReducer);
  const dispatch = useDispatch();
  const [tabPosition, setTabPosition] = useState('left');
  const [status, setStatus] = useState(false);
  const user = JSON.parse(localStorage.getItem('Customer'))

  useEffect(() => {
    window.scrollTo(0, 0)
    if (localStorage.getItem('Customer')) {
      setStatus(true)
    }
    dispatch(fetchDetailMovie(param.id))
    dispatch(getComments(param.id))
    dispatch(actFetchLichChieu())

  }, [])

  if (loading) return <Loader value={50}></Loader>
  const checkData = () => {
    if (data?.heThongRapChieu.length === 0) {
      return <div className='text-center '>
        <h2 style={{ paddingTop: 60 }}>Xin lỗi quý khách , hiện tại chưa có lịch chiếu</h2>
      </div>


    } else {
      return renderTabs()
    }
  }

  const renderComments = () => {
    return comment.data?.map(item => {
      return <div className='comments-content'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ccc" class="w-6 h-6">
            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <h5>{item.taiKhoan}</h5>
          <p>{item.noiDung}</p>
          <span>{item.ngayBinhLuan}</span>
        </div>
      </div>
    })
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
      <Tabs tabPosition={tabPosition} defaultActiveKey='1' items={items} >
      </Tabs>

    )

  }

  return (
    <>
      <div className='bg-detail-movie' >
        <div className="container ">
          <div className='detail-movie'>
            <div className='row h-100 detail-movie-content'>
              <div className="col-12  col-md-6  ">
                <div className="detail-movie-left mx-auto mx-md-0">
                  <img className=' mr-auto' style={{ height: 400, width: '100%' }} src={data && DOMAIN_IMG + data.hinhAnh} alt="" onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = 'https://static.thenounproject.com/png/504708-200.png';
                    currentTarget.style.background = '#fff';
                    currentTarget.style.objectFit = 'contain'
                  }} />
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
                <p>Ngày khởi chiếu : {moment(data && data.ngayKhoiChieu).format('DD - MM - YYYY')}</p>
                <h3 className='mt-3'>{data && data.tenPhim}</h3>
                <p className='mt-3'>{data && data.moTa}</p>
                <div className='d-flex justify-content-start  align-items-baseline mt-4'>
                  <Rate disabled allowHalf value={data && (data.danhGia / 2)} /> <span className='ml-2 text-white font-semibold'>{data && data.danhGia}/10</span>
                  <a href='#detail-movie-theater' className='btn btn-danger ml-3 ml-sm-5'>MUA VÉ</a>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
      <div className="bg-detail-movie-theater">
        <div className="container">
          <div className="row w-100 mx-auto ">
            <div className=' col-12'>
              <div id='detail-movie-theater' >
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
                  {checkData()}
                </ConfigProvider>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-more-movies">
        <div className="container">
          <span>Phim chiếu rạp</span>
          <h3 >Có thể bạn sẽ thích</h3>
          <MoviesItem movies={movies} param={param} />
        </div>
      </div>
      <div className="bg-detail-movie-comments">
        <div className="container">
          <div className='row w-100 mx-auto' >
            <div className='col-12'>
              <div className='detail-movie-comments'>
                <div className='p-4'>
                  <p className={comment.data?.length === 0 ? 'mb-3' : 'mb-0'}>{comment.data ? `Bình luận (${comment.data.length})` : 'Bình luận (0)'}</p>
                  {status ? (
                    <form className='d-flex mt-2 items-start ' onSubmit={(e) => {
                      e.preventDefault()
                      const data = {
                        maPhim: +param.id,
                        taiKhoan: user.taiKhoan,
                        noiDung: e.target[0].value
                      }
                      dispatch(postComment(data))
                    }}>

                      <textarea style={{ backgroundColor: '#100f0fb8' }} name="" id="" className='w-100   p-2 rounded' placeholder='Nhập bình luận tại đây'></textarea>
                      <button type='submit' className='btn btn-danger ml-2'>Gửi</button>
                    </form>

                  ) : (
                    <div className='text-center'>
                      <Link to={'/auth'} className='btn '>Đăng nhập để bình luận</Link>
                    </div>
                  )}
                  {renderComments()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
