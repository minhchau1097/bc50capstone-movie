import { UpOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

export default function BackToTop() {
    const [visible, setVisible] = useState(false)



    const Button = styled.div`
       position: fixed; 
       width: 40px;
       height: 40px;
       right:20px;
       bottom: 20px;
       font-size: 3rem;
       z-index: 100;
       cursor: pointer;
       visibility: ${visible ? 'visible' : 'hidden'};
    `
    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);

    }, [])


    const toggleVisible = () => {
        const scrolled = window.scrollY;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
            in place of 'smooth' */
        });
    };


    return (
        <>
            <Button>
                <span className='items-center justify-center text-[22px] w-full h-full rounded-lg' onClick={scrollToTop} style={{ display: visible ? 'flex' : 'none', backgroundColor: '#fb4226' }}>
                    <UpOutlined className='text-white ' />
                </span>
            </Button>
        </>
    )
}
