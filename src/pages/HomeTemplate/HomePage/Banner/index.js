import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBannerMovie } from './duck/actions';
import Loader from 'Loader';
import { DOMAIN_IMG } from 'utils/api';
import { Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
export default function Banner() {
    const loading = useSelector((state) => state.bannerMovieReducer.loading)
    // const data = useSelector((state) => state.bannerMovieReducer.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchBannerMovie())
    }, [])
    const data = [
        {
            hinhAnh: 'https://www.bhdstar.vn/wp-content/uploads/2023/12/referenceSchemeHeadOfficeallowPlaceHoldertrueheight1069-24.jpg',
            tenPhim: 'AQUAMAN AND THE LOST KINGDOM'
        },
        {
            hinhAnh: 'https://cdn2.cellphones.com.vn/1200x400/https://cdn.sforum.vn/sforum/wp-content/uploads/2024/01/mat-vu-ong-thumbnail.jpg',
            tenPhim: 'MẬT VỤ ONG'
        }
    ]
    if (loading) return <Loader />
    const renderBanner = () => {

        return data.map((item, index) => {
            return (
                <SwiperSlide>
                    <div key={index} className='banner-item'>
                        <img  src={item.hinhAnh} alt={item.tenPhim} onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = 'https://static.thenounproject.com/png/504708-200.png';
                            currentTarget.style.objectFit = 'contain'
                        }} />
                    </div>
                </SwiperSlide>
            )
        })
    }
    return (

        <Swiper

            spaceBetween={2}
            breakpoints={{
                400: {
                    slidesPerView: 1
                },
                640: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 1
                },
                1024: {
                    slidesPerView: 1
                },
                1200: {
                    slidesPerView: 1
                }

            }}
            grid={{
                rows: 1,


            }}

            modules={[Grid]}
        >

            {renderBanner()}

        </Swiper>



    )
}
