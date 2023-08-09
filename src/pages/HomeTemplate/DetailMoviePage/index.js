import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDetailMovie } from './duck/actions'
import LoadingComponent from 'GlobalSetting/Loading/LoadingComponent'
import Trailer from '../Trailer'
export default function DetailMoviePage() {
    const param = useParams()
    const loading = useSelector((state) => state.detailMovieReducer.loading)
    const data = useSelector((state) => state.detailMovieReducer.data)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDetailMovie(param.id))
        console.log('useEffect')
    }, [])



    return (
        <div className="container detail-movie">

            <div className='row pb-5 h-100' style={{ marginTop: 200, marginBottom: 200 }}>
                <div className="col-sm-5 col-12">
                    <img className='img-fluid rounded mr-auto' style={{ height: 400 }} src={data && data.hinhAnh} alt="" />
                </div>
                <div className="col-sm-7  col-12 mt-5 mt-sm-0">

                    <h3>{data && data.tenPhim}</h3>
                    <p>{data && data.moTa}</p>

                    <button className='btn btn-primary'>Mua vé</button>
                    {/* Button trigger modal */}
                    <button type="button" className="btn btn-danger " data-toggle="modal" data-target="#modelId" onClick={() => {
                        dispatch({
                            type: 'OPEN_FORM',
                            data: <Trailer trailer={data.trailer} />
                        })
                    }}>
                        Trailer
                    </button>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/103LVliF9pA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>



                </div>
            </div>
        </div>
    )
}
