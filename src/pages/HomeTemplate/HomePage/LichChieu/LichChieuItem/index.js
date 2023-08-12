import { PlayCircleOutlined } from '@ant-design/icons';
import Trailer from 'pages/HomeTemplate/Trailer';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function LichChieuItem(props) {
  const dispatch = useDispatch();
  return (
    <div className="movie-card card m-2 mb-4">
      <div className="header-buy-ticket">
        <Link to={`/detail/${props.movie.maPhim}`} className='btn btn-BuyTicket' style={{ zIndex: '1' }}>Mua Vé</Link>
        <div className='footer-buy-ticket'></div>
        {/* Button trigger modal */}
      <button className='play-trailer' type="button" data-toggle="modal" data-target="#modelId" onClick={() => {
        dispatch({
          type: 'OPEN_FORM',
          data: <Trailer trailer={props.movie.trailer} />
        })
      }}>
        <PlayCircleOutlined className='d-block'/>
      </button>
      </div>
      <img className="card-img-top" src={props.movie.hinhAnh} alt="" style={{ height: '400px', objectFit: 'cover' }} />
      
      <div className="card-body">
        <h5 className="card-title">{props.movie.moTa.length > 30 ? props.movie.moTa.substr(0, 30) + '...' : props.movie.moTa}</h5>
      </div>
    </div>
  )
}


