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
       span{
        background-color: #e4d804
       }
       &:hover {
        span{

            background-color: #171d22;
        }   
        svg{

            color: #fff;
        }
       }
    `;
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
                <span className='animate__animated animate__fadeInDown items-center justify-center text-[22px] w-full h-full rounded-lg' onClick={scrollToTop} style={{ display: visible ? 'flex' : 'none' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#171d22]">
                        <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
                    </svg>
                </span>
            </Button>
        </>
    )
}
