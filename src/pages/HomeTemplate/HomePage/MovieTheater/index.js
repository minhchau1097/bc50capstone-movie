import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieTheater } from './duck/actions'
import  { RenderTabsMovie } from 'components/TabMovieTheater';
export default function MovieTheater() {

  const data = useSelector((state) => state.listMovieTheaterReducer.data)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieTheater())
  }, [])


  return (
    <div className="bg-movie-theater">
      <div className="container">
        <RenderTabsMovie data={data}/>
      </div>
    </div>
  )
}
