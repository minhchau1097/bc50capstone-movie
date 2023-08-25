import * as ActionType from './constants';


const manageUser = {
    loading: false,
    data: null,
    dataAdd: null,
    dataEdit: null,
    dataDelete: null,
    error: null,
    thongTinNguoiDung: undefined
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
            state.dataAdd = null;
            state.error = null;
            return { ...state };
        }
        case ActionType.ADD_USER_SUCCESS: {
            state.loading = false;
            state.dataAdd = action.payload;
            state.error = null;
            return { ...state };
        }
        case ActionType.ADD_USER_FAIL: {
            state.loading = false;
            state.dataAdd = null;
            state.error = action.payload;
            return { ...state };
        }
        //EDIT-USER
        case ActionType.EDIT_USER_REQUEST: {
            state.loading = true;
            state.dataEdit = null;
            state.error = null;
            return { ...state };
        }
        case ActionType.EDIT_USER_SUCCESS: {
            state.loading = false;
            state.dataEdit = action.payload;
            state.error = null;
            return { ...state };
        }
        case ActionType.EDIT_USER_FAIL: {
            state.loading = false;
            state.dataEdit = null;
            state.error = action.payload;
            return { ...state };
        }
        case ActionType.SELECT_USER: {
            state.thongTinNguoiDung = action.payload;
            return {...state};
        }
        //DELETE
        case ActionType.DELETE_USER_REQUEST: {
            state.loading = true;
            state.dataDelete = null;
            state.error = null;
            return { ...state };
        }
        case ActionType.DELETE_USER_SUCCESS: {
            state.loading = false;
            state.dataDelete = action.payload;
            state.error = null;
            return { ...state };
        }
        case ActionType.DELETE_USER_FAIL: {
            state.loading = false;
            state.dataDelete = null;
            state.error = action.payload;
            return { ...state };
        }
        default:
            return { ...state };
    }
}

export default manageUserReducer;