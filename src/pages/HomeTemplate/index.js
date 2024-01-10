import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './_components/navbar'
import { actTryLogin } from 'pages/AdminTemplate/LoginPage/duck/actions'
import { useDispatch } from 'react-redux'
import BackToTop from './_components/BackToTop'
import Footer from './_components/footer'

export default function HomeTemplate() {
  const MemoFooter = React.memo(() => {
    return <Footer />
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  useEffect(() => {
    dispatch(actTryLogin(navigate))
  }, [])
  return (
    <>
      <Navbar />
      <BackToTop />
      <Outlet />
      <MemoFooter />

    </>
  )
}
