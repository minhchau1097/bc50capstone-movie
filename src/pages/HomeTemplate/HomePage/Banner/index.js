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
        if (loading) return <div>LOading...</div>
        return data?.map((item, index) => {
            let active = ''
            if (index === 0) {
                active = 'active'
            } else {
                active = ''
            }
            return (

                <div className={`carousel-item  ${active}`} key={index} >
                    <img style={{objectFit:'fill',height:700, width:'100%'}} src={item.hinhAnh} alt={item.maBanner} />
                </div>
            )
        })
    }
    return (
        <div id="carouselId" className="carousel slide mb-5" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselId" data-slide-to={0} className="active" />
                <li data-target="#carouselId" data-slide-to={1} />
                <li data-target="#carouselId" data-slide-to={2} />
            </ol>
            <div className="carousel-inner" role="listbox">
                {renderBanner()}
                {/* <div className="carousel-item">
                    <img data-src="holder.js/900x500/auto/#666:#444/text:Second slide" alt="Second slide" />
                </div>
                <div className="carousel-item">
                    <img data-src="holder.js/900x500/auto/#666:#444/text:Third slide" alt="Third slide" />
                </div> */}
            </div>
            {/* <a className="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselId" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
            </a> */}
        </div>
    )
}
