import React from 'react'
// import { DetailUser } from 'type/type'

export default function TitleItem({ item }) {
    return (
        <div className="card card-blur mb-4 rounded-[8px] !bg-bgForm font-semibold" style={{boxShadow:'0px 1px 7px 0px rgba(0, 0, 0, 0.46)'}}>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-3">
                        <p className="mb-0 text-gray-300">Tài khoản </p>
                    </div>
                    <div className="col-sm-9">
                        <p className="text-muted mb-0">{item?.taiKhoan}</p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-sm-3">
                        <p className="mb-0 text-gray-300">Họ và tên</p>
                    </div>
                    <div className="col-sm-9">
                        <p className="text-muted mb-0">{item?.hoTen}</p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-sm-3">
                        <p className="mb-0 text-gray-300">Email</p>
                    </div>
                    <div className="col-sm-9">
                        <p className="text-muted mb-0">{item?.email}</p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-sm-3">
                        <p className="mb-0 text-gray-300">Số điện thoại</p>
                    </div>
                    <div className="col-sm-9">
                        <p className="text-muted mb-0">{item?.soDt}</p>
                    </div>
                </div>

            </div>
        </div>

    )
}
