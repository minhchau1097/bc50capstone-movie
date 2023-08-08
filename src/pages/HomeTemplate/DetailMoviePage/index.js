import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDetailMovie } from './duck/actions'
export default function DetailMoviePage() {
    const param = useParams()
    const loading = useSelector((state) => state.detailMovieReducer.loading)
    const data = useSelector((state) => state.detailMovieReducer.data)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDetailMovie(param.id))
        console.log('useEffect')
    }, [])
    console.log(data)
    return (
        <div className="container">

            <div className='row pb-5' style={{marginTop:200}}>
                <div className="col-4">
                    <img className='img-fluid' src={data && data.hinhAnh} alt="" />
                </div>
                <div className="col-8">

                    <h3>{data && data.tenPhim}</h3>
                    <p>{data && data.moTa}</p>
                    {/* <iframe width={560} height={315} src={`${data&& data.trailer}`} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                     */}
                    <button className='btn btn-primary'>Mua vé</button>
                    
                </div>
            </div>
        </div>
    )
}
