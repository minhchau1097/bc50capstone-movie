import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './_components/navbar'

export default function HomeTemplate() {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <>
      <Navbar />
      <Outlet />

    </>
  )
}
