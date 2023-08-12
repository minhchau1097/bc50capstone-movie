import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './_components/navbar'

export default function HomeTemplate() {
  return (
    <>
        <Navbar/>
        <Outlet/>
      
    </>
  )
}
