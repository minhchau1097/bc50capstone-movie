import React from 'react'
import Banner from './Banner'
import LichChieu from './LichChieu';
import MovieTheater from './MovieTheater';
import Footer from '../_components/footer';
import About from './About';



export default function HomePage() {
    return (
        <div>
            <Banner />
            <LichChieu />
            <MovieTheater />
            <About/>
            <Footer />

        </div>
    )
}
