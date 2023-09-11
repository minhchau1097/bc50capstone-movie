import { PlayCircleOutlined } from '@ant-design/icons';
import Trailer from 'pages/HomeTemplate/Trailer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function LichChieuItem(props) {
  const dispatch = useDispatch();
  return (
    <div className="movie-card card m-2 mb-4">
      <div className="header-buy-ticket">
        <Link to={`/detail/${props.films.maPhim}`} className='btn btn-BuyTicket' style={{ zIndex: '1' }}>Mua Vé</Link>
        <div className='footer-buy-ticket'></div>
        {/* Button trigger modal */}
      <button className='play-trailer' type="button" onClick={() => {
        dispatch({
          type: 'OPEN_FORM',
          data: <Trailer trailer={props.films.trailer} />,
          open:true,
        })
      }}>
        <PlayCircleOutlined className='d-block'/>
      </button>
      </div>
      <img className="card-img-top" src={props.films.hinhAnh} alt="" style={{ height: '400px', objectFit: 'cover' }} />
      
      <div className="card-body">
        <h5 className="card-title">{props.films.moTa.length > 30 ? props.films.moTa.substr(0, 30) + '...' : props.films.moTa}</h5>
      </div>
    </div>
  )
}


