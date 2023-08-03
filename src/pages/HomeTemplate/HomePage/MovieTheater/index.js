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
    return data?.map((item) => {
      return (
        <table className="table">
          <tbody>
            <tr>
              <td>     <img style={{ width: 80, height: 80 }} src={item.logo} alt="" />
              </td>
            <td>we2</td>
          </tr>
          <tr>
            <td scope="row" />
            <td />
            <td />
          </tr>
        </tbody>
      </table >
   
      )
})
  }
return (
   
renderMovieTheater()
  )
}
