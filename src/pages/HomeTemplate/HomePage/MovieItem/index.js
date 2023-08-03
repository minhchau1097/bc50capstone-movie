import React from 'react'
import { Link } from 'react-router-dom'
export default function MovieItem(props) {
  return (
    <div className="movie-item col-md-3 wow animate__animated animate__fadeInUp mt-5">
      <div className="card" >
        <img className="card-img-top " src={props.movie.hinhAnh} alt="" />
        <div className="card-body">
          <div className="card-title">
            <h6 >{props.movie.tenPhim}</h6>
          </div>
          <div className='card-button'>
            <Link to={`/detail/${props.movie.maPhim}`} className="btn btn-danger">MUA VÉ</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
