import React from 'react';
import ReactLoading from 'react-loading';

const Loader = ({ value, color }) => (
    <div className='bg-loader min-h-screen min-w-[100vw] relative'>

        <ReactLoading type={'spinningBubbles'} color='#e4d804' height={value} width={value} className=' absolute bottom-1/2 left1/2 right-1/2 translate-x-1/2 translate-y-1/2' />
    </div>
);

export default Loader; 