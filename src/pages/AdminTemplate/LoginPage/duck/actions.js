import * as ActionTypes from "./constants";
import api from "utils/api";


export const actAuth = (user, navigate) => {
    return (dispatch) => {
        dispatch(actAuthRequest())
        api.post('QuanLyNguoiDung/DangNhap', user)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    const user = result.data.content
                    if ((user.maLoaiNguoiDung === 'QuanTri')) {
                        dispatch(actAuthSuccess(user));
                        // quan tri => luu trang thai login
                        localStorage.setItem('UserAdmin', JSON.stringify(user));
                        // quantri => redirect admin/dashboard
                        navigate('/admin/dashboard', { replace: true })
                    } else {
                        dispatch(actAuthSuccess(user));
                        // quan tri => luu trang thai login
                        localStorage.setItem('Customer', JSON.stringify(user));
                        // quantri => redirect admin/dashboard
                        navigate('/', { replace: true })
                    }

                }
            })
            .catch((error) => {
                dispatch(actAuthFail(error.response.data.content))
            })
    }
}
export const actLogout = (navigate) => {
    localStorage.removeItem('Customer')
    navigate('/', { replace: true })
    return {
        type: ActionTypes.AUTH_CLEAR
    }
}
const actAuthRequest = () => {
    return {
        type: ActionTypes.AUTH_REQUEST

    }
}

const actAuthSuccess = (data) => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        payload: data
    }
}
const actAuthFail = (error) => {
    return {
        type: ActionTypes.AUTH_FAIL,
        payload: error
    }
}