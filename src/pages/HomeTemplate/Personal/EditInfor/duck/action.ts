import * as ActionTypes from "./constant";
import  {api}  from "utils/api";
import { Action, User } from "type/type";
import { AppDispatch } from 'store';
import { NavigateFunction } from "react-router-dom";
export const actUpdateDetailUser = (user: User, navigate: NavigateFunction) => {
    return (dispatch: AppDispatch) => {
        dispatch(actUpdateDetailUserRequest())
        api.put('QuanLyNguoiDung/CapNhatThongTinNguoiDung', user)
            .then((result) => {
                if (result.status === 200) {
                    dispatch(actUpdateDetailUserSuccess(result.data))

                }
            })
            .catch((error) => {
                dispatch(actUpdateDetailUserFail(error.response.data))
            })

    }
}
const actUpdateDetailUserRequest = (): Action => {
    return {
        type: ActionTypes.UPDATE_DETAIL_REQUEST

    }
}

const actUpdateDetailUserSuccess = (data: string): Action => {
    return {
        type: ActionTypes.UPDATE_DETAIL_SUCCESS,
        payload: data
    }
}
const actUpdateDetailUserFail = (error: string): Action => {
    return {
        type: ActionTypes.UPDATE_DETAIL_FAIL,
        payload: error
    }
}


export const actClearNote = (): Action => {
    return {
        type: ActionTypes.CLEAR_NOTE,
    }
}