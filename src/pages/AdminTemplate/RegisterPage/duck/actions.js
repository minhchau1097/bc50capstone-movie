import * as ActionTypes from './constants';
import api from 'utils/api';


export const actRegister = (user, navigate) => {
  return (dispatch) => {
    dispatch(actRegisterRequest());
    api.post("QuanLyNguoiDung/DangKy", user)
      .then((result) => {
        if (result.data.statusCode === 200) {
          const user = result.data.content;
          //luu thong tin tk moi dang ky
          dispatch(actRegisterSuccess(user))
          //chuyen huong page
          navigate("/auth", { replace: true });
        }
      })
      .catch((error) => {
        dispatch(actRegisterFail(error));
      })
  }
}

const actRegisterRequest = () => {
  return {
    type: ActionTypes.REGISTER_REQUEST,
  }
}

const actRegisterSuccess = (data) => {
  return {
    type: ActionTypes.REGISTER_SUCCESS,
    payload: data
  }
}

const actRegisterFail = (error) => {
  return {
    type: ActionTypes.REGISTER_FAIL,
    payload: error
  }
}