import * as ActionType from './constants';


const manageUser = {
    loading: false,
    data: null,
    error: null,
}

const manageUserReducer = (state = manageUser, action) => {
    switch (action.type) {
        case ActionType.MANAGE_USER_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state };
        }
        case ActionType.MANAGE_USER_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state };
        }
        case ActionType.MANAGE_USER_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state };
        }
        default:
            return { ...state };
    }
}

export default manageUserReducer;