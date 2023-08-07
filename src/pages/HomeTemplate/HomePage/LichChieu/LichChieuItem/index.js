import React, { Component } from 'react';

export default class LichChieuItem extends Component {
  render() {
    const { movie } = this.props;
    return (
      // col-12 col-md-4 col-lg-3
      <div className="movie-card card m-2 mb-4">
        <div className="header-buy-ticket">
          <button className='btn btn-BuyTicket' style={{zIndex: '1'}}>Mua Vé</button>
          <div className='footer-buy-ticket'></div>
        </div>
        <img className="card-img-top" src={movie.hinhAnh} alt="" style={{ height: '400px', objectFit: 'cover' }} />
        <div className="card-body">
          <h5 className="card-title">{movie.moTa.length > 30 ? movie.moTa.substr(0, 30) + '...' : movie.moTa}</h5>
        </div>
      </div>
    )
  }
}

