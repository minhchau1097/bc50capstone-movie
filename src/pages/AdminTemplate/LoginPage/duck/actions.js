import * as ActionTypes from "./constants";
import api from "utils/api";
import { history } from 'App';
//phiên đăng nhập 60p
 const expire = 60 * 60 * 1000;

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
                        // history.goBack();
                    } else {
                        dispatch(actAuthSuccess(user));
                        // quan tri => luu trang thai login
                        localStorage.setItem('Customer', JSON.stringify(user));
                        // quantri => redirect admin/dashboard
                        navigate('/', { replace: true })
                        // history.goBack();
                    }
                    let date = new Date().getTime()
                    //setLocalStorage expire 
                    localStorage.setItem('expire', date + expire)
                    // action timeout logout
                    dispatch(timeoutLogout(expire, navigate))
                }
            })
            .catch((error) => {
                dispatch(actAuthFail(error.response.data.content))
            })
    }
}
export const actLogout = (navigate) => {
    if (localStorage.getItem('UserAdmin')) {

        localStorage.removeItem('UserAdmin')
        navigate('/auth', { replace: true })
    } else if (localStorage.getItem('Customer')) {

        localStorage.removeItem('Customer')
        navigate('/', { replace: true })
    }
    return {
        type: ActionTypes.AUTH_CLEAR
    }
}

export const actTryLogin = (navigate) => {
    return (dispatch) => {
        let user = null
        if (localStorage.getItem('UserAdmin')) {
            user = JSON.parse(localStorage.getItem('UserAdmin'))
        } else if (localStorage.getItem('Customer')) {
            user = JSON.parse(localStorage.getItem('Customer'))
        }


        if (!user) return;

        const exp = localStorage.getItem('expire')
        const date = new Date().getTime()
        if (date > exp) {
            dispatch(actLogout(navigate))
            return;
        }
        // neu thoi gian hien tai < thoi gian het han
        dispatch(timeoutLogout(exp - date, navigate))
        dispatch(actAuthSuccess(user))
    }
}
const timeoutLogout = (expire, navigate) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(actLogout(navigate))
        }, expire);
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