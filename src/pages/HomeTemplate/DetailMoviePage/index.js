import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDetailMovie } from './duck/actions'
import Trailer from '../Trailer'
import { PlayCircleOutlined } from '@ant-design/icons'
import { Rate, Tabs } from 'antd'
import moment from 'moment/moment'



export default function DetailMoviePage() {
    const param = useParams()
    const data = useSelector((state) => state.detailMovieReducer.data)
    const dispatch = useDispatch();
    const [tabPosition, setTabPosition] = useState('left');

    useEffect(() => {
        dispatch(fetchDetailMovie(param.id))
    }, [])
    const renderTabs = () => {
        if (data?.heThongRapChieu.length > 0) {


            let items = data?.heThongRapChieu.map((item, index) => {
                return {
                    key: index,
                    label: (
                        <div key={index} className='theater-logo'>
                            <img  src={item.logo} alt={item.tenHeThongRap} title={item.tenHeThongRap} />
                            
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
                                                        <Link className='movie-date' >{moment(item2.ngayChieuGioChieu).format('h:mmA')}</Link>

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
                <div className="row w-100 mx-auto ">
                    <div className='background-detail-movie-theater col-12'>
                        <div id='detail-movie-theater' >
                            <Tabs tabPosition={tabPosition} defaultActiveKey='1' items={items}  className='detail-movie-theater'>
                            </Tabs> 
                        </div>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }


    return (
        <div style={{ backgroundImage: `url(${data && data.hinhAnh})`, backgroundPosition: 'top', backgroundSize: 'cover', minHeight: '100vh' }}>
            <div className='card-blur' >
                <div className="container " style={{padding:'100px 0'}}>
                    <div className='detail-movie'>
                        <div className='row h-100 detail-movie-content'>
                            <div className="col-12  col-md-6  ">
                                <div className="detail-movie-left mx-auto mx-md-0">
                                    <img className=' mr-auto' style={{ height: 400, width: '100%' }} src={data && data.hinhAnh} alt="" />
                                    {/* Button trigger modal */}
                                    <button className='play-trailer' type="button" data-toggle="modal" data-target="#modelId" onClick={() => {
                                        dispatch({
                                            type: 'OPEN_FORM',
                                            data: <Trailer trailer={data.trailer} />
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
                                    <Rate disabled allowHalf value={data && (data.danhGia <= 1 ? data.danhGia : data.danhGia / 2)} /> <span className='ml-2'>{data && data.danhGia}/10</span>
                                    <a href='#detail-movie-theater' className='btn btn-danger ml-3 ml-sm-5'>Mua vé</a>
                                </div>
                            </div>
                            {renderTabs()}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
