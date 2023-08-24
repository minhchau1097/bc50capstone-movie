import React from 'react'
import { useSelector } from 'react-redux'

export default function Footer() {
  const data = useSelector(state => state.listMovieTheaterReducer.data)
  return (
    <footer className=" dark:bg-black">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TIX</span>
            <div className="grid grid-cols-2 gap-6">
              <ul className="text-gray-500 dark:text-gray-400 font-medium mt-2 text-sm">
                <li className="mb-4">
                  <span className="text-gray-400">FAQ</span>
                </li>
                <li>
                  <span className="text-gray-400">Brand Guidelines</span>
                </li>
              </ul>
              <ul className="text-gray-500 dark:text-gray-400 font-medium mt-2 text-sm">
                <li className="mb-4">
                  <span className="text-gray-400">Thỏa thuận sử dụng</span>
                </li>
                <li>
                  <span className="text-gray-400">Chính sách bảo mật </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 ">
            <div className='mr-2'>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">ĐỐI TÁC</span>
            <div className='grid grid-cols-3 gap-3 mt-4 mr-auto'>

              {data?.map((item, index) => {
                return <img key={index} width={40} height={40} src={item.logo} alt={item.tenHeThongRap} />
              })}
              </div>
            </div>
            <div className="flex  justify-between sm:flex-col">
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                  <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span className="sr-only">Discord community</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                  <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">GitHub account</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Dribbble account</span>
              </a>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <img src="data:image/jpeg;base64,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" width={100} height={100} alt='ZION' />
          <div className="text-sm text-white sm:text-center dark:text-gray-400 sm:mx-2">
            <p className="mb-2 mt-4 sm:mt-0">TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</p>
            <p>Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.</p>
            <p>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,
              đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.</p>
            <p> Số Điện Thoại (Hotline): 1900 545 436</p>
          </div>
          <img className="mt-2 sm:mt-0" src="https://demo1.cybersoft.edu.vn/static/media/daThongBao-logo.cb85045e.png" width={100} height={100} alt='logo' />
        </div>
      </div>
    </footer>


  )
}
