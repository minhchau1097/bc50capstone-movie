import React from 'react'
import YouTube from "react-youtube";

export default function Trailer(props) {
  const videoOptions = {
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      showinfo: 0,
      mute: 0,
      loop: 0,

    }
  };

  const getSrcYoutube = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    const ID = (match && match[2].length === 11) ? match[2] : null
    return ID
    // 'https://www.youtube.com/embed/'
  }
  return (
    <YouTube videoId={getSrcYoutube(props.trailer)}  opts={videoOptions} />

  )
}
