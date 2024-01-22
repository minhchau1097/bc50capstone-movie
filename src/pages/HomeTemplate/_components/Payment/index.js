import React, { useRef, useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons, CreateOrderBraintreeActions } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { actBuyTicket } from "pages/HomeTemplate/BookingTicketPage/duck/actions";

function Payment({ param, data }) {
    const dispatch = useDispatch();
    const [state, setState] = useState(0)
    const USD = 23000;
    const VND = new Intl.NumberFormat('vn-VN');
    useEffect(() => {
        const price = data.reduce((total, item) => total + item.giaVe, 0)
        const values = +(price / USD).toFixed(2);
        setState(values)
    }, [data])
  

    return (
        <div style={{ width: 200 }}>
            <PayPalScriptProvider  options={{ clientId: 'AeAytdnsAhXqHfzEqay1qztuo8t1gf0G86K756pDYdnPXZ1EYcCXsaXwCSuhIAQJH-8KAlIg1aHqID9V' }}>
                <PayPalButtons style={{ label: 'pay', shape: 'rect', layout: 'horizontal',height:50 }} createOrder={(data, actions,) => {
                    console.log(data)
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: "USD",
                                    value: state,
                                },
                            },
                        ],
                    });
                }}
                    onApprove={async (actions) => {
                        // const order = await actions.order.capture();
                        alert('thanh toan thanh cong')
                        const ticket = {
                            maLichChieu: Number(param.id),
                            danhSachVe: data?.map((ticket) => {
                                return {
                                    maGhe: ticket.maGhe,
                                    giaVe: ticket.giaVe
                                }
                            })
                        };
                        dispatch(actBuyTicket(ticket))
                    }}
                    onError={(err) => {
                        alert('Thanh toán thất bại, vui lòng thử lại')
                        console.log(err)

                    }}
                    onCancel={()=>{
                        window.location.reload(false)
                    }}
                />
            </PayPalScriptProvider>
        </div>

    );
}

export default Payment;