import * as ActionType from './constants';


const bookingState = {
    loading: false,
    data: null,
    error: null,
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
            state.loading = true;
            state.data = action.payload;
            state.error = null;
            return { ...state };
        }
        case ActionType.BOOKING_TICKET_FAIL: {
            state.loading = true;
            state.data = null;
            state.error = action.payload;
            return { ...state };
        }
        default:
            return { ...state };
    }
}
export default bookingTicketReducer;