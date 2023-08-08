import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDetailMovie } from './duck/actions'
import LoadingComponent from 'GlobalSetting/Loading/LoadingComponent'
export default function DetailMoviePage() {
    const param = useParams()
    const loading = useSelector((state) => state.detailMovieReducer.loading)
    const data = useSelector((state) => state.detailMovieReducer.data)
    const dispatch = useDispatch();
    let trailer = 'd-none';
    useEffect(() => {
        dispatch(fetchDetailMovie(param.id))
        console.log('useEffect')
    }, [])
    const getSrcYoutube = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        const ID = (match && match[2].length === 11) ? match[2] : null
        return 'https://www.youtube.com/embed/' + ID
    }
    const handleTrailer = () => {
        trailer = 'd-block'
    }

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
                    <button className='btn btn-danger' onClick={handleTrailer}>Trailer</button>

                    {/* <div className={`detail-movie-trailer ${trailer}`} > */}
                        {data && (
                            <iframe width={560} height={315} src={getSrcYoutube(data.trailer)} frameborder={0} allowFullScreen></iframe>)}

                    {/* </div> */}


                </div>
            </div>
        </div>
    )
}
