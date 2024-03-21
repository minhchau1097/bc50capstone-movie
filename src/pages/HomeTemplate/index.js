import React, { memo, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar'
import { actTryLogin } from 'pages/AdminTemplate/LoginPage/duck/actions'
import { useDispatch } from 'react-redux'
import BackToTop from '../../components/BackToTop'
import Footer from '../../components/footer'

export default function HomeTemplate() {
  const MemoFooter = memo(() => {
    return <Footer />
  })
  const MemoNavbar = memo(() => {
    return <Navbar />
  })
  const MemoBackToTop = memo(() => {
    return <BackToTop />
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
      <MemoNavbar />
      <MemoBackToTop />
      <Outlet />
      <MemoFooter />

    </>
  )
}
