import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './_components/navbar'
import { actTryLogin } from 'pages/AdminTemplate/LoginPage/duck/actions'
import { useDispatch } from 'react-redux'
import BackToTop from './_components/BackToTop'
import { WebsocketContext } from 'contexts/WebsocketContext'

export default function HomeTemplate() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const socket = useContext(WebsocketContext)
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  useEffect(()=>{
    socket.on('connect',()=>{
      console.log('connected')
    })
    socket.on('onMessage',(data)=>{
      console.log(data)
    })
    socket.emit('newMessage','hi there')
    dispatch(actTryLogin(navigate))
  },[])
  return (
    <>
      <Navbar />
      <BackToTop/>
      <Outlet />

    </>
  )
}
