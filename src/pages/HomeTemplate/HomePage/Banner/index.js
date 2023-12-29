import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBannerMovie } from './duck/actions'
export default function Banner() {
    const loading = useSelector((state) => state.bannerMovieReducer.loading)
    const data = useSelector((state) => state.bannerMovieReducer.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchBannerMovie())
    }, [])
    const renderBanner = () => {
      
        return data?.map((item, index) => {
            let active = ''
            if (index === 0) {
                active = 'active'
            } else {
                active = ''
            }
            return (

                <div className={`carousel-item  ${active}`} key={index} >
                    <img src={item.hinhAnh} alt={item.maBanner} />
                </div>
            )
        })
    }
    return (
        <div id="carouselId" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselId" data-slide-to={0} className="active" />
                <li data-target="#carouselId" data-slide-to={1} />
                <li data-target="#carouselId" data-slide-to={2} />
            </ol>
            <div className="carousel-inner" role="listbox">
                {renderBanner()}

            </div>

        </div>
    )
}
