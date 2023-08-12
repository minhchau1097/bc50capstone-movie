import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBookingTicket } from './duck/actions';
import LoadingComponent from 'GlobalSetting/Loading/LoadingComponent';


export default function BookingTicketPage() {
  const data = useSelector((state) => state.bookingTicketReducer.data);
  const loading = useSelector((state) => state.bookingTicketReducer.loading);
  const dispatch = useDispatch();
  const param = useParams();
  console.log(data);
  useEffect(() => {
    dispatch(fetchBookingTicket(param.id));
  }, []);

  const renderSeats = () => {
    return data?.danhSachGhe.map((ghe, index) => {
      const classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      const classGheDaDat = ghe.daDat === true ? 'gheDaDat' : "";
      return <Fragment key={index}>
        <button disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat}`} key={index}>
          {ghe.daDat ? "X" : ghe.stt}
        </button>
        {(index + 1) % 16 === 0 ? <br /> : ""}
      </Fragment>
    })
  }
  if (loading) return <LoadingComponent/>;
  return (
    <div style={{ marginTop: "85px", marginRight: '5px', overflow: 'hidden' }}>
      <div className="row" >
        {/* SEAT */}
        <div className="col-8">
          <div>
            {renderSeats()}
          </div>
        </div>
        {/* BUY TICKET */}
        <div className="col-4" >
          <h3 className='text-green-400 text-center text-2xl'>0 đ</h3>
          <hr />
          <div className='flex flex-row justify-between items-center'>
            <div className='w-4/5'>
              <h5>Cụm Rạp:</h5>
            </div>
            <span>{data?.thongTinPhim.tenCumRap}</span>
          </div>
          <hr />
          <div className='flex flex-row justify-between items-center'>
            <div className='w-4/5'>
              <h5>Địa Chỉ:</h5>
            </div>
            <span>{data?.thongTinPhim.diaChi}</span>
          </div>
          <hr />
          <div className='flex flex-row justify-between items-center'>
            <div className='w-4/5'>
              <h5>Rạp:</h5>
            </div>
            <span>{data?.thongTinPhim.tenRap}</span>
          </div>
          <hr />
          <div className='flex flex-row justify-between items-center'>
            <div className='w-4/5'>
              <h5>Ngày Giờ Chiếu:</h5>
            </div>
            <span>{data?.thongTinPhim.ngayChieu} - {data?.thongTinPhim.gioChieu}</span>
          </div>
          <hr />
          <div className='flex flex-row justify-between items-center'>
            <div className='w-4/5'>
              <h5>Tên Phim:</h5>
            </div>
            <span>{data?.thongTinPhim.tenPhim}</span>
          </div>
          <hr />
          <div className='flex flex-row justify-between items-center'>
            <h5>Chọn:</h5>
          </div>
          <hr />
          <div className='h-full flex flex-col justify-center items-center'>
            <button className='btn btn-booking w-100 text-center p-3 mb-5'>
              ĐẶT VÉ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
