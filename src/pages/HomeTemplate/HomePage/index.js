import React from 'react'
import Banner from './Banner'
import LichChieu from './LichChieu';
import MovieTheater from './MovieTheater';
import Footer from '../_components/footer';



export default function HomePage() {
    return (
        <div>
            <Banner />
            <LichChieu />
            <MovieTheater />
            <Footer />

        </div>
    )
}
