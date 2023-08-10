import * as ActionType from './constants';
import api from 'utils/api';

export const fetchBookingTicket = (id) => {
  return (dispatch) => {
    dispatch(actBookingTicketRequest());
    api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`)
      .then((result) => {
        if(result.data.statusCode === 200){
          dispatch(actBookingTicketSuccess(result.data.content));
        }
      })
      .catch((error) => {
        dispatch(actBookingTicketFail(error));
      })
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