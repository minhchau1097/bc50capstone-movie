
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { Link } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { DOMAIN_IMG } from 'utils/api';

import * as moment from 'moment'
import 'moment/locale/vi'
export default function SwiperItem({ item, value }) {
    moment.locale('vi')
    // const dispatch = useAppDispatch();
    const [state, setState] = useState('');
    // const [loading, setLoading] = useState(false);
    // const handleOk = () => {
    //     setLoading(true)
    //     setTimeout(async () => {
    //         setLoading(false)
    //         setOpen(false)
    //         // dispatch(actDeleteCourse(value))
    //     }, 1000)
    // };

    // const handleCancel = () => {
    //     setOpen(false);
    // };
    useEffect(() => {
        item.danhSachGhe?.forEach(item => {
            setState(item)

        })
    }, [])
    return (
        <div className="m-ticket">
            {/* <p className="m">Vé</p> */}
            <div className="movie-details">
                <img src={DOMAIN_IMG + item.hinhAnh} className="poster" />
                <div className="movie">
                    <h4 className='line-clamp-2 text-white'>{item.tenPhim}</h4>
                    <p>{state.maHeThongRap}, 2D</p>
                    <p>{moment(item.ngayChieu).format("MMM Do YY")} | {moment(item.ngayChieu).format('LT')}</p>
                    <p>{state.tenCumRap}</p>
                </div>
            </div>
            <div className="info">
                Thông tin vé
            </div>
            <div className="ticket-details">
                <img src="https://pngimg.com/uploads/qr_code/qr_code_PNG2.png" className="scan" />
                <div className="ticket">
                    <b>{state.tenRap}</b>
                    <p>Ghế {state.tenGhe}</p>
                    <h6 >Mã vé {item.maVe}</h6>
                </div>
            </div>
            {/* <div className="info-cancel">
            </div> */}
            <div className="total-amount">
                <p>Tổng cộng</p>
                <p>{item.giaVe}đ</p>
            </div>
        </div>


    )

}
