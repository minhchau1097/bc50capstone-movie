import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './_components/navbar'
import Footer from './_components/footer'
export default function HomeTemplate() {
  // if(!localStorage.getItem('Customer') || !localStorage.getItem('UserAdmin')){
  //   return <Navigate to={'/auth'} replace/>
  // }
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}
