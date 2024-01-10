import React from 'react'
import Banner from './Banner'
import LichChieu from './LichChieu';
import MovieTheater from './MovieTheater';
import About from './About';



export default function HomePage() {
    return (
        <div>
            <Banner />
            <LichChieu />
            <MovieTheater />
            <About/>
            

        </div>
    )
}
