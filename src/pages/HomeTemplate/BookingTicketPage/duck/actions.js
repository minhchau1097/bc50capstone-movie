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

export const actBuyTicket = (ticket) => {
  return (dispatch) => {
    dispatch(actBuyTicketRequest());
    api.post("QuanLyDatVe/DatVe", ticket)
      .then((result) => {
        dispatch(fetchBookingTicket(ticket.maLichChieu));
        //đặt vé xong clear thông tin
        dispatch(actBuyTicketClearData());
        if (result.data.statusCode === 200) {
          dispatch(actBuyTicketRedirect());
        }

      })
      .catch((error) => {
        dispatch(actBuyTicketFail(error));
      })
  }
}

export const actHistoryTicket = (key) => {
  return (dispatch) => {
    dispatch(actHistoryTicketRequest());
    api.post("QuanLyNguoiDung/ThongTinTaiKhoan")
      .then((result) => {
        dispatch(actHistoryTicketSuccess(result.data.content))
      })
      .catch((error) => {
        dispatch(actHistoryTicketFail(error));
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
//BUY TICKET
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
const actBuyTicketRedirect = () => {
  return {
    type: ActionType.REDIRECT_ANTD,
  }
}
const actBuyTicketClearData = () => {
  return {
    type: ActionType.CLEAR_DATA_TICKET,
  }
}
export const actBuyTicketChangeTabPane = (number) => {
  return {
    type: ActionType.CHANGE_TABPANE,
    payload: number,
  }
}
//HISTORY TICKET
const actHistoryTicketRequest = () => {
  return {
    type: ActionType.HISTORY_TICKET_REQUEST,
  }
}
const actHistoryTicketSuccess = (data) => {
  return {
    type: ActionType.HISTORY_TICKET_SUCCESS,
    payload: data
  }
}
const actHistoryTicketFail = (error) => {
  return {
    type: ActionType.HISTORY_TICKET_FAIL,
    payload: error
  }
}
