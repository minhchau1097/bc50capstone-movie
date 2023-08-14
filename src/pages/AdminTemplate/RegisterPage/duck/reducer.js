import * as ActionTypes from "./constants";


const registerState = {
    loading: false,
    data: null,
    error: null,
}

const registerReducer = (state = registerState, action) => {
    switch (action.type) {
        case ActionTypes.REGISTER_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state }
        }
        case ActionTypes.REGISTER_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state }
        }
        case ActionTypes.REGISTER_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state }
        }
        default:
            return { ...state }
    }
}

export default registerReducer;