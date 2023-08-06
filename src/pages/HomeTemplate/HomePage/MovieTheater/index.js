import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieTheater } from './duck/actions'
export default function MovieTheater() {

  const data = useSelector((state) => state.listMovieTheaterReducer.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMovieTheater())
  }, [])
  const renderMovieTheater = () => {
    return data?.map((item, index) => {
      return (
        <tr>
            <td key={index}>  <img style={{ width: 80, height: 80 }} src={item.logo} alt="" />
        </td>
            </tr>
      )
    })
  }
  return (
    <div className="container">
       <table className="table">
          <tbody>
            {renderMovieTheater()}
            <tr>
              <td scope="row" />
              <td />
              <td />
            </tr>
          </tbody>
        </table >
    </div>
  )
}
