import * as ActionTypes from './constants';
import api from 'utils/api';

export const actFetchPersonalInfo = () => {
  return (dispatch) => {
    dispatch(actPersonalRequest());
    api.post('QuanLyNguoiDung/ThongTinTaiKhoan')
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actPersonalSuccess(result.data.content));
        }
      }).catch((error) => {
        dispatch(actPersonalFail(error))
      })
  }
}
// QuanLyNguoiDung/CapNhatThongTinNguoiDung
export const actEditPersonalInfo = (info, navigate) => {
  return (dispatch) => {
    dispatch(actEditPersonalRequest());
    api.post('QuanLyNguoiDung/ThongTinTaiKhoan', info)
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actEditPersonalSuccess(result.data.content));      
          alert(result.data.message);
          navigate("/", { replace: true });
        }
      }).catch((error) => {
        dispatch(actEditPersonalFail(error))
      })
  }
}


const actPersonalRequest = () => {
  return {
    type: ActionTypes.PERSONAL_REQUEST,
  }
}
const actPersonalSuccess = (data) => {
  return {
    type: ActionTypes.PERSONAL_SUCCESS,
    payload: data
  }
}
const actPersonalFail = (error) => {
  return {
    type: ActionTypes.PERSONAL_FAIL,
    payload: error
  }
}
export const actUpdateInput = (data) => {
  return {
    type: ActionTypes.PERSONAL_INFO,
    payload: data
  }
}

//EDIT
const actEditPersonalRequest = () => {
  return {
    type: ActionTypes.EDIT_PERSONAL_REQUEST,
  }
}
const actEditPersonalSuccess = (dataEdit) => {
  return {
    type: ActionTypes.EDIT_PERSONAL_SUCCESS,
    payload: dataEdit
  }
}
const actEditPersonalFail = (error) => {
  return {
    type: ActionTypes.EDIT_PERSONAL_FAIL,
    payload: error
  }
}