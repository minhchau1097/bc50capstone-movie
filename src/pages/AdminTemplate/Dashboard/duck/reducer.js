import * as ActionType from './constants';


const manageUser = {
    loading: false,
    data: null,
    error: null,
    thongTinNguoiDung: {}
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
        //ADD-USER
        case ActionType.ADD_USER_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state };
        }
        case ActionType.ADD_USER_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state };
        }
        case ActionType.ADD_USER_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state };
        }
        //EDIT-USER
        case ActionType.EDIT_USER_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state };
        }
        case ActionType.EDIT_USER_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state };
        }
        case ActionType.EDIT_USER_FAIL: {
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