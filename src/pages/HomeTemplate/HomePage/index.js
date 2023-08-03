import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchListMovie } from './duck/actions'
import Banner from './Banner'
import LichChieu from './LichChieu';
// import MovieTheater from './MovieTheater'

export default function HomePage() {
    // const loading = useSelector((state) => state.listMovieReducer.loading)
    // const data = useSelector((state) => state.listMovieReducer.data)
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(fetchListMovie())
    // }, [])

    // const renderMovie = () => {
    //     if (loading) return <div>Loading...</div>
    //     return data?.map((movie) => <MovieItem key={movie.maPhim} movie={movie} />)
    // }
    return (
        <div>
            <Banner />
            {/* <div className="container">
                <h3>Phim đang chiếu</h3>
                <div className="row">
                    {renderMovie()}
                </div>
                <MovieTheater />
            </div> */}
            <LichChieu />

        </div>
    )
}
