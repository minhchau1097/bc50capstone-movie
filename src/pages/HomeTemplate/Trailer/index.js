import React from 'react'
import { useSelector } from 'react-redux'

export default function Trailer(props) {
    const pause = useSelector((state) => state.modalReducer.pause)
  
    const getSrcYoutube = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        const ID = (match && match[2].length === 11) ? match[2] : null
        return 'https://www.youtube.com/embed/' + ID
    }
  return (
        <iframe width={'100%'} height={'100%'} src={pause && getSrcYoutube(props.trailer)} title='Trailer'  frameborder={0} allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" tabIndex={-1}></iframe>
        
  )
}
