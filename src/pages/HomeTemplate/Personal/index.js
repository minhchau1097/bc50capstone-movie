import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'
import { actFetchPersonalInfo } from './duck/actions';
import { ConfigProvider, Breadcrumb, Empty } from 'antd';
import SwiperItem from './SwiperItem';
import CardItem from './CardItem';
import TitleItem from './TitleItem';
import { Navigation, Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import bgDetail from 'assets/images/contact_bg.jpg';

export default function PersonalInfo() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.personalInfoReducer);
  useEffect(() => {
    dispatch(actFetchPersonalInfo());
  }, []);
  if (!localStorage.getItem('Customer')) {
    return <Navigate to='/auth' replace />
  }
  const renderCourse = () => {
    if (data?.thongTinDatVe.length === 0) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className='font-semibold' imageStyle={{ minHeight: 200 }} description='Không có dữ liệu' />

    } else {
      return data?.thongTinDatVe.map((item, index) => {

        // let value = { tenPhim: item.tenPhim, hinhAnh: item.hinhAnh }
        return <SwiperSlide className='text-center' key={index}>
          <SwiperItem item={item} />
        </SwiperSlide>

      })
    }
  }

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Breadcrumb: {
              /* here is your component tokens */
              separatorColor: '#fff'
            },
            Empty: {
              colorTextDisabled: '#fff'
            }
          },
        }}
      >
        <section className='bg-top bg-cover' style={{ backgroundImage: `url(${bgDetail})` }}>

          <div className=" space-y-2 min-h-screen pt-[175px] pb-[120px] px-[50px] ">

            <Breadcrumb children='text-white' className='p-2 card-blur mb-4  bg-bgForm rounded-sm' style={{boxShadow:'0px 1px 7px 0px rgba(0, 0, 0, 0.46)'}}
              items={[
                {
                  title:
                    <Link to={'/'}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg></Link>
                  ,
                },
                {
                  title: (
                    <>
                      <div className='flex  items-center'>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <span className='text-white font-semibold text-[16px]'>Thông tin cá nhân</span>

                      </div>
                    </>
                  ),
                },
              ]}
            />

            <div className="row ">
              <div className="col-lg-4">
                <CardItem item={data} />
              </div>
              <div className="col-lg-8">
                <TitleItem item={data} />

              </div>
            </div>
            {/* <div className="row"> */}

            {/* <div className="col-12 "> */}

            <Swiper
              color='#000'
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
                  slidesPerView: 3
                },
                1200: {
                  slidesPerView: 4
                }

              }}
              
              grid={{
                rows: 1,


              }}
              // pagination={{
              //   clickable:true,
              // }}
              // navigation={true}
              modules={[Grid, Navigation,Pagination]}
            >

              {renderCourse()}
              {/* {renderCourse()} */}
            </Swiper>

            {/* </div> */}
            {/* </div> */}
          </div>
        </section>
      </ConfigProvider>
    </>
  )
}
