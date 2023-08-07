import React from 'react';

export default function LichChieuItem(props) {
  return (
    <div className="movie-card card m-2 mb-4">
      <div className="header-buy-ticket">
        <button className='btn btn-BuyTicket' style={{ zIndex: '1' }}>Mua Vé</button>
        <div className='footer-buy-ticket'></div>
      </div>
      <img className="card-img-top" src={props.movie.hinhAnh} alt="" style={{ height: '400px', objectFit: 'cover' }} />
      <div className="card-body">
        <h5 className="card-title">{props.movie.moTa.length > 30 ? props.movie.moTa.substr(0, 30) + '...' : props.movie.moTa}</h5>
      </div>
    </div>
  )
}


