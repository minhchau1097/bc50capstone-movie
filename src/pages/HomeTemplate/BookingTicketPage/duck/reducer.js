import * as ActionType from './constants';


const bookingState = {
    loading: false,
    data: null,
    error: null,
    danhSachGheDangDat: [],
}

const bookingTicketReducer = (state = bookingState, action) => {
    switch (action.type) {
        case ActionType.BOOKING_TICKET_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state };
        }
        case ActionType.BOOKING_TICKET_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state };
        }
        case ActionType.BOOKING_TICKET_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state };
        }
        case ActionType.BOOKING_SEAT: {
            const danhSachGheCapNhat = [...state.danhSachGheDangDat];
            const index = danhSachGheCapNhat.findIndex((gheDD) => gheDD.maGhe === action.payload.maGhe);
            if (index != -1) {
                state.danhSachGheDangDat = danhSachGheCapNhat.splice(index, 1);
            } else {
                danhSachGheCapNhat.push(action.payload);
            }
            return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
        }
        case ActionType.BUY_TICKET_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state };
        }
        case ActionType.BUY_TICKET_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state };
        }
        case ActionType.BUY_TICKET_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state };
        }
        default:
            return { ...state };
    }
}
export default bookingTicketReducer;