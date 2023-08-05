import React, { Component } from 'react'
import { connect } from 'react-redux';
import {bookingSeatAction} from './../duck/action';

class Seats extends Component {
  renderSeat = () => {
    return this.props.rowSeat.danhSachGhe.map((ghe, index) => {
      let cssSeatBooked = '';
      let disabled = false;
      //Trạng thái ghế đã bị ng khác đặt
      if (ghe.daDat) {
        cssSeatBooked = 'gheDuocChon';
        disabled = true;
      }
      //Xét trạng thái đang có ng đặt
      let cssSeatBooking = '';
      let indexSeatBooking = this.props.listBookingSeat.findIndex((gheDangDat) => gheDangDat.soGhe === ghe.soGhe);
      if (indexSeatBooking !== -1) {
        cssSeatBooking = 'gheDangChon';
      }

      //className có nghĩa là class ghe và gheDuocChon(class ghe là mặc định, cái nào thỏa if thì cái đó dùng class gheDuocChon)
      //disabled cũng tương tự className
      return <button onClick={() => {
        this.props.bookingSeat(ghe);
      }} disabled={disabled} className={`ghe ${cssSeatBooked} ${cssSeatBooking}`} key={index}>
        {ghe.soGhe}
      </button>
    })
  }
  //Render hàng số trong hàng ghế
  renderNumberSeat = () => {
    return this.props.rowSeat.danhSachGhe.map((row, index) => {
      return <button className='rowNumber'>
        {row.soGhe}
      </button>
    })
  }

  renderBlockSeat = () => {
    const { rowSeat, numberRowSeat } = this.props;
    if (numberRowSeat === 0) {
      return <div className='ml-4'>
        {rowSeat.hang} {this.renderNumberSeat()}
      </div>
    } else {
      return <div>
        {rowSeat.hang} {this.renderSeat()}
      </div>
    }

  }
  render() {
    return (
      <div className='text-light text-left ml-5 mt-1' style={{ fontSize: '30px' }}>
        {this.renderBlockSeat()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listBookingSeat: state.userReducer.listBookingSeat,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    bookingSeat: (ghe) => {
      dispatch(bookingSeatAction(ghe))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Seats);