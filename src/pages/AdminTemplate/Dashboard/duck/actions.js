import * as ActionType from './constants';
import api from 'utils/api';


export const actManageUser = () => {
    return (dispatch) => {
        dispatch(actUserRequest());
        api.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01")
            .then((result) => {
                // console.log(result.data.content);
                dispatch(actUserSuccess(result.data.content));
            })
            .catch((error) => {
                dispatch(actUserFail(error));
            })
    }
}


const actUserRequest = () => {
    return {
        type: ActionType.MANAGE_USER_REQUEST,
    }
}
const actUserSuccess = (data) => {
    return {
        type: ActionType.MANAGE_USER_SUCCESS,
        payload: data
    }
}
const actUserFail = (error) => {
    return {
        type: ActionType.MANAGE_USER_FAIL,
        payload: error
    }
}