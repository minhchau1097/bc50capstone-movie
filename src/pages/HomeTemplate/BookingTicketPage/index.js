import React, { useEffect, Fragment, useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate, Link } from 'react-router-dom';
import { fetchBookingTicket, actBookingSeat, actBuyTicket, actHistoryTicket, actBuyTicketChangeTabPane, actChoosingSeat } from './duck/actions';
import _ from 'lodash';
import { Tabs } from 'antd';
import moment from 'moment';
import { WebsocketContext } from 'contexts/WebsocketContext';

function BookingTicketPage() {
  const data = useSelector((state) => state.bookingTicketReducer.data);
  const { danhSachGheDangDat, danhSachGheNguoiKhacDangDat } = useSelector((state) => state.bookingTicketReducer);
  const dispatch = useDispatch();
  const param = useParams();
  const socket = useContext(WebsocketContext)
  const [booking, setBooking] = useState()
  const user = JSON.parse(localStorage.getItem('Customer'))?.taiKhoan || JSON.parse(localStorage.getItem('UserAdmin'))?.taiKhoan
  // console.log(status)
  useEffect(() => {
    dispatch(fetchBookingTicket(param.id));
    socket.emit('join-room',param.id)
  }, []);
  useEffect(() => {
    setBooking(danhSachGheNguoiKhacDangDat)


  }, [danhSachGheNguoiKhacDangDat])
  useEffect(() => {
    // socket.emit('booking', danhSachGheDangDat)
    socket.on('onBooking', (data) => {
      if (data.id != socket.id) {
        dispatch(actChoosingSeat(data))

      }
    })
    return () => {
      socket.off()
    }
  }, [danhSachGheDangDat])

  const handleChoseSeat = (ghe) => {

    // dispatch(actAnotherBookingSeat(ghe))
    dispatch(actBookingSeat(ghe));

  }
  const renderSeats = () => {
    return data?.danhSachGhe.map((ghe, index) => {

      //Ghế vip
      const classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      //ghế người khác đã đặt
      const classGheDaDat = ghe.daDat === true ? 'gheDaDat' : "";
      //Xử lý ghế đang được đặt
      let classGheDangDat = "";
      const indexGheDangDat = danhSachGheDangDat?.findIndex((gheDD) => gheDD.maGhe === ghe.maGhe);
      if (indexGheDangDat != -1) {
        classGheDangDat = "gheDangDat";
      }
      let anotherCus = false
      let classNguoiKhacDat = ''
      booking?.forEach(item => {
        if (ghe.maGhe === item.maGhe) {
          classNguoiKhacDat = 'gheNguoiKhacDat'
          anotherCus = true
        }
      })
      // Xử lý ghế mình tự đặt
      // const user = JSON.parse(localStorage.getItem('Customer'))?.taiKhoan || JSON.parse(localStorage.getItem('UserAdmin'))?.taiKhoan
      let classGheDaDuocDat = "";
      if (user === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat';
      }

      return <Fragment key={index}>
        <button onClick={() => {
          let newData = { ...ghe, taiKhoanNguoiDat: user, id: socket.id ,room: param.id}
          handleChoseSeat(newData)
          socket.emit('booking', newData)
        }} disabled={ghe.daDat || anotherCus} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat}${classNguoiKhacDat}  `} key={index} >
          {ghe.daDat ? "X" : ghe.tenGhe}
        </button>
        {(index + 1) % 16 === 0 ? <br /> : ""}
      </Fragment>
    })
  }

  const handleBookTicket = () => {
    const ticket = {
      maLichChieu: Number(param.id),
      danhSachVe: danhSachGheDangDat?.map((ticket) => {
        return {
          maGhe: ticket.maGhe,
          giaVe: ticket.giaVe
        }
      })
    };
    dispatch(actBuyTicket(ticket));
  }

  if (!(localStorage.getItem("Customer") || (localStorage.getItem("UserAdmin")))) {
    return <Navigate replace to={"/auth"} />;
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <div className="grid grid-cols-12" >
        {/* SEAT */}
        <div className="col-span-8">
          <div>
            {renderSeats()}
            <div className='grid grid-cols-6 mr-10'>
              <div className='gird grid-cols-2 text-center'>
                <button className='ghe'></button>
                <span style={{ fontWeight: "600" }}><br />Ghế Thường</span>
              </div>
              <div className='gird grid-cols-2 text-center'>
                <button className='ghe gheDaDat'>X</button>
                <span style={{ fontWeight: "600" }}><br />Ghế Đã Đặt</span>
              </div>
              <div className='gird grid-cols-2 text-center'>
                <button className='ghe gheNguoiKhacDat'></button>
                <span style={{ fontWeight: "600" }}><br />Ghế Người Khác Chọn</span>
              </div>
              <div className='gird grid-cols-2 text-center'>
                <button className='ghe gheDangDat'></button>
                <span style={{ fontWeight: "600" }}><br />Đang Được Chọn</span>
              </div>
              <div className='gird grid-cols-2 text-center'>
                <button className='ghe gheVip'></button>
                <span style={{ fontWeight: "600" }}><br />Ghế Vip</span>
              </div>
              <div className='gird grid-cols-2 text-center'>
                <button className='ghe gheDaDuocDat'>X</button>
                <span style={{ fontWeight: "600" }}><br />Ghế bạn đã đặt</span>
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

const items = [
  {
    key: '1',
    label: `01 CHỌN GHẾ & THANH TOÁN`,
    children: <BookingTicketPage />,
  },
  {
    key: '2',
    label: `02 KẾT QUẢ ĐẶT VÉ`,
    children: <KetQuaDatVePage />,
  },
];
export default function ManageTicket() {
  const { tabActive } = useSelector((state) => state.bookingTicketReducer);
  const dispatch = useDispatch();
  // defaultActiveKey: phải là chuỗi
  return <Tabs defaultActiveKey='1' activeKey={tabActive} items={items} onChange={(key) => {
    dispatch(actBuyTicketChangeTabPane(key));
  }} className='mt-20 ml-2 text-sm font-medium' />;
}


function KetQuaDatVePage() {
  const { thongTinNguoiDung } = useSelector((state) => state.bookingTicketReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actHistoryTicket());
  }, []);

  const renderTicketItem = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((item, index) => {
      return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={item.hinhAnh} />
          <div className="flex-grow">
            <h2 className="text-purple-700 title-font font-medium">{item.tenPhim}</h2>
            <p className="text-purple-500 font-medium">Giờ Chiếu: {moment(item.ngayDat).format("hh:mm A")} <br /> Ngày Chiếu: {moment(item.ngayDat).format("DD-MM-YYYY")} </p>
            <p className="text-purple-500 font-medium">Địa điểm: {_.first(item.danhSachGhe).tenHeThongRap} <br /> Rạp Chiếu: {_.first(item.danhSachGhe).tenCumRap}</p>
            <p className="text-purple-500 font-medium">Ghế: {_.first(item.danhSachGhe).tenGhe}</p>
          </div>
        </div>
      </div>
    })
  }

  return <div>
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-14 mx-auto">
        <div className="flex flex-col text-center w-full mb-14 mt-4">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-red-600">Lịch Sử Đặt Vé Của Bạn</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin đặt vé của bạn bên dưới đây. Nếu phát hiện thông tin vé bị sai, bạn vui lòng đến tại quầy vé để đổi. Chúc bạn có một buổi xem phim vui vẻ!!!</p>
        </div>
        <div className="flex flex-wrap -m-2 mb-4">
          {renderTicketItem()}
        </div>
        <Link to={"/"} className='btn-redirectHome bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded text-xl'>Về Trang Chủ</Link>
      </div>

    </section>
  </div>
}
