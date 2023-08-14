import * as ActionType from './constants';
import api from 'utils/api';
import Swal from 'sweetalert2';

export const fetchBookingTicket = (id) => {
  return (dispatch) => {
    dispatch(actBookingTicketRequest());
    api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`)
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actBookingTicketSuccess(result.data.content));
        }
      })
      .catch((error) => {
        dispatch(actBookingTicketFail(error));
      })
  }
}

export const actBuyTicket = (id, ticket, navigate) => {
  return (dispatch) => {
    dispatch(actBuyTicketRequest());
    api.post("QuanLyDatVe/DatVe", ticket)
      .then((result) => {
        console.log(result.data.content);
        // const ticket = result.data.content;
        // if (result.data.statusCode === 200) {
        //   const ticket = result.data.content;
        //   if (!(ticket.maLoaiNguoiDung === "KhachHang")) {
        //     //show error, khi reject thì nó tự động hiểu và chạy vào catch
        //     const error = {
        //       response: {
        //         data: {
        //           content: "Bạn không có quyền truy cập",
        //         },
        //       },
        //     };
        //     return Promise.reject(error);
        //   }
        // }
        // dispatch(actBuyTicketSuccess(ticket));
        // localStorage.setItem("Customer", JSON.stringify(ticket));
        // navigate(`/booking-ticket/${id}`, { replace: true });
      })
      .catch((error) => {
        dispatch(actBuyTicketFail(error));
      })
  }
}



export const actBookingSeat = (ghe) => {
  return {
    type: ActionType.BOOKING_SEAT,
    payload: ghe
  }
}

const actBookingTicketRequest = () => {
  return {
    type: ActionType.BOOKING_TICKET_REQUEST,
  }
}
const actBookingTicketSuccess = (data) => {
  return {
    type: ActionType.BOOKING_TICKET_SUCCESS,
    payload: data
  }
}
const actBookingTicketFail = (error) => {
  return {
    type: ActionType.BOOKING_TICKET_FAIL,
    payload: error
  }
}

const actBuyTicketRequest = () => {
  return {
    type: ActionType.BUY_TICKET_REQUEST,
  }
}
const actBuyTicketSuccess = (data) => {
  return {
    type: ActionType.BUY_TICKET_SUCCESS,
    payload: data
  }
}
const actBuyTicketFail = (error) => {
  return {
    type: ActionType.BUY_TICKET_FAIL,
    payload: error
  }
}