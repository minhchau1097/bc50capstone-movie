import React, { Component } from 'react';
import BookingItem from './BookingItem/bookingItem';
import Seats from './Seats/Seats';
import data from '../bookingTicket/danhSachGhe.json';


export default class BookingTicket extends Component {
  // renderRowSeat = () => {
  //   return data.map((rowSeat, index) => {
  //     return <div key={index}>
  //       <Seats rowSeat={rowSeat} numberRowSeat={index} />
  //     </div>
  //   })
  // }
  render() {
    return (
      <div className='bookingMovie' style={{ position: "fixed", width: "100%", height: '100%', backgroundImage: "url('./images/bgmovie.jpg')", backgroundSize: '100%' }}>
        <div style={{ position: "fixed", width: "100%", height: '100%', backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-8 text-center">
                <h1 className='text-warning'>BOOKING TICKET CYBERLEARN</h1>
                <div className='mt-5 text-light' style={{ fontSize: '25px' }}>Screen This Way</div>
                <div className='mt-2' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className='screen'></div>
                  {/* {this.renderRowSeat()} */}
                </div>

              </div>
              <div className="col-sm-4">
                <h1 className='text-light mt-5' style={{ fontSize: '30px' }}>LIST SEATS YOUR CHOOSE</h1>
                {/* <BookingItem /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
