import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDetailMovie } from './duck/actions'
import Trailer from '../Trailer'
import { PlayCircleOutlined } from '@ant-design/icons'


export default function DetailMoviePage() {
    const param = useParams()
    const data = useSelector((state) => state.detailMovieReducer.data)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDetailMovie(param.id))
        console.log('useEffect')
    }, [])



    return (
        <div className="container detail-movie">

            <div className='row pb-5 h-100' style={{ marginTop: 200, marginBottom: 200 }}>
                <div className="col-sm-5 col-12 ">
                    <div className="detail-movie-left">
                        <img className='img-fluid rounded mr-auto' style={{ height: 400 }} src={data && data.hinhAnh} alt="" />
                        {/* Button trigger modal */}
                        <button className='play-trailer' type="button" data-toggle="modal" data-target="#modelId" onClick={() => {
                            dispatch({
                                type: 'OPEN_FORM',
                                data: <Trailer trailer={data.trailer} />
                            })
                        }}>
                            <PlayCircleOutlined />
                        </button>
                    </div>
                </div>
                <div className="col-sm-7  col-12 mt-5 mt-sm-0 detail-movie-right">

                    <h3>{data && data.tenPhim}</h3>
                    <p>{data && data.moTa}</p>

                    <button className='btn btn-primary'>Mua vé</button>




                </div>
            </div>
        </div>
    )
}
