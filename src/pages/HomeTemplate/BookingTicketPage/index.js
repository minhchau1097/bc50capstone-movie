import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { fetchBookingTicket, actBookingSeat, actBuyTicket } from './duck/actions';
import _ from 'lodash';

export default function BookingTicketPage() {
  const data = useSelector((state) => state.bookingTicketReducer.data);
  const danhSachGheDangDat = useSelector((state) => state.bookingTicketReducer.danhSachGheDangDat);
  const dispatch = useDispatch();
  const param = useParams();
  useEffect(() => {
    dispatch(fetchBookingTicket(param.id));
  }, []);

  const handleChoseSeat = (ghe) => {
    dispatch(actBookingSeat(ghe));
  }

  const renderSeats = () => {
    return data?.danhSachGhe.map((ghe, index) => {
      const classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      //ghế người khác đã đặt
      const classGheDaDat = ghe.daDat === true ? 'gheDaDat' : "";
      //Xử lý ghế đang được đặt
      let classGheDangDat = "";
      const indexGheDangDat = danhSachGheDangDat?.findIndex((gheDD) => gheDD.maGhe === ghe.maGhe);
      if (indexGheDangDat != -1) {
        classGheDangDat = "gheDangDat";
      }
      //Xử lý ghế mình tự đặt
      const valueUserLogin = JSON.parse(localStorage.getItem('UserAdmin')).taiKhoan;
      let classGheDaDuocDat = "";
      if (valueUserLogin === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat';
      }

      return <Fragment key={index}>
        <button onClick={() => handleChoseSeat(ghe)} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat}`} key={index}>
          {ghe.daDat ? "X" : ghe.stt}
        </button>
        {(index + 1) % 16 === 0 ? <br /> : ""}
      </Fragment>
    })
  }

  const handleBookTicket = () => {
    const ticket = {
      maLichChieu: Number(param.id),
      danhSachVe: danhSachGheDangDat
    }
    console.log(ticket);
    dispatch(actBuyTicket(ticket));
  }

  if (!(localStorage.getItem("Customer"))) {
    return <Navigate replace to={"/auth"} />;
  }
  return (
    <div style={{ marginTop: "85px" }}>
      <div className="grid grid-cols-12" >
        {/* SEAT */}
        <div className="col-span-8">
          <div>
            {renderSeats()}
            <div className='flex justify-center'>
              <div className='d-flex items-center'>
                <button className='ghe gheDaDat'>X</button>
                <span style={{ fontWeight: "600" }}>Ghế Đã Đặt</span>
              </div>
              <div className='d-flex items-center'>
                <button className='ghe'></button>
                <span style={{ fontWeight: "600" }}>Ghế Thường</span>
              </div>
              <div className='d-flex items-center'>
                <button className='ghe gheDangDat'></button>
                <span style={{ fontWeight: "600" }}>Đang Được Chọn</span>
              </div>
              <div className='d-flex items-center'>
                <button className='ghe gheVip'></button>
                <span style={{ fontWeight: "600" }}>Ghế Vip</span>
              </div>
              <div className='d-flex items-center'>
                <button className='ghe gheDaDuocDat'>X</button>
                <span style={{ fontWeight: "600" }}>Ghế bạn đã đặt</span>
              </div>
            </div>
          </div>
        </div>
        {/* BUY TICKET */}
        <div className="col-span-4" >
          <h3 className='text-orange-600 text-center text-2xl'>
            {danhSachGheDangDat?.reduce((tongTien, gheDD, index) => {
              return tongTien += gheDD.giaVe;
            }, 0).toLocaleString()} VNĐ
          </h3>
          <hr />
          <div className='flex flex-row items-center'>
            <div className='w-4/5'>
              <h5>Cụm Rạp:</h5>
            </div>
            <span style={{ color: 'orangered', fontWeight: "600" }}>{data?.thongTinPhim.tenCumRap}</span>
          </div>
          <hr />
          <div className='flex flex-row items-center'>
            <div className='w-4/5'>
              <h5>Địa Chỉ:</h5>
            </div>
            <span style={{ color: 'orangered', fontWeight: "600" }}>{data?.thongTinPhim.diaChi}</span>
          </div>
          <hr />
          <div className='flex flex-row items-center'>
            <div className='w-4/5'>
              <h5>Rạp:</h5>
            </div>
            <span style={{ color: 'orangered', fontWeight: "600" }}>{data?.thongTinPhim.tenRap}</span>
          </div>
          <hr />
          <div className='flex flex-row items-center'>
            <div className='w-4/5'>
              <h5>Ngày Giờ Chiếu:</h5>
            </div>
            <span style={{ color: 'orangered', fontWeight: "600" }}>{data?.thongTinPhim.ngayChieu} - {data?.thongTinPhim.gioChieu}</span>
          </div>
          <hr />
          <div className='flex flex-row items-center'>
            <div className='w-4/5'>
              <h5>Tên Phim:</h5>
            </div>
            <span style={{ color: 'orangered', fontWeight: "600" }}>{data?.thongTinPhim.tenPhim}</span>
          </div>
          <hr />
          <div className='flex flex-row items-center' style={{ flexWrap: "wrap" }}>
            <div className='w-4/5'>
              <h5>Chọn:</h5>
            </div>
            {(_.sortBy(danhSachGheDangDat, ['maGhe', 'stt']))?.map((gheDD, index) => {
              return <span key={index} style={{ color: 'orangered', fontWeight: "600" }}>Ghế: {gheDD.stt}, </span>
            })}
          </div>
          <hr />
          <div className=' flex flex-col justify-center items-center'>
            <button onClick={() => handleBookTicket()} className='btn btn-booking w-full text-center p-3 mb-5'>
              ĐẶT VÉ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
