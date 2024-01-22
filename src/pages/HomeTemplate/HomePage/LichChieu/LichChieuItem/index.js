import { PlayCircleOutlined } from '@ant-design/icons';
import Trailer from 'pages/HomeTemplate/Trailer';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DOMAIN_IMG } from 'utils/api';

export default function LichChieuItem(props) {
  const dispatch = useDispatch();
  return (
    <div className="card-blur movie-card card m-2 mb-4">
      <div className="header-buy-ticket">
        <Link to={`/detail/${props.films.maPhim}`} className='btn btn-BuyTicket' style={{ zIndex: '1' }}>Mua Vé</Link>
        <div className='footer-buy-ticket'></div>
        {/* Button trigger modal */}
        <button className='play-trailer' type="button" onClick={() => {
          dispatch({
            type: 'OPEN_FORM',
            data: <Trailer trailer={props.films.trailer} />,
            open: true,
          })
        }}>
          <PlayCircleOutlined className='d-block' />
        </button>
      </div>
      <img className="card-img-top" src={`${DOMAIN_IMG}${props.films.hinhAnh}`} alt="" style={{ height: '400px', objectFit: 'cover' }} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = 'https://static.thenounproject.com/png/504708-200.png';
                        currentTarget.style.background= '#fff';
                        currentTarget.style.objectFit = 'contain'
                    }} />

      <div className="card-body" style={{ backgroundColor: 'transparent' }}>
        <h5 className='card-title' >{props.films.tenPhim}</h5>
      </div>
    </div>
  )
}


