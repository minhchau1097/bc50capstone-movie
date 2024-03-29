import * as ActionTypes from './constants';
import api from 'utils/api';

export const actFetchPersonalInfo = () => {
  return (dispatch) => {
    dispatch(actPersonalRequest());
    api.post('QuanLyNguoiDung/ThongTinTaiKhoan')
      .then((result) => {
        if (result.data.statusCode === 201) {
          dispatch(actPersonalSuccess(result.data.content));
        }
      }).catch((error) => {
        dispatch(actPersonalFail(error))
      })
  }
}
// QuanLyNguoiDung/CapNhatThongTinNguoiDung
export const actEditPersonalInfo = (data) => {
  return (dispatch) => {
    dispatch(actEditPersonalRequest());
    api.post('QuanLyNguoiDung/CapNhatThongTinNguoiDung', data)
      .then((result) => {
        if (result.data.statusCode === 201) {
          dispatch(actEditPersonalSuccess(result.data.content));
        }
      }).catch((error) => {
        dispatch(actEditPersonalFail(error))
      })
  }
}


export const actPersonalRequest = () => {
  return {
    type: ActionTypes.PERSONAL_REQUEST,
  }
}
export const actPersonalSuccess = (data) => {
  return {
    type: ActionTypes.PERSONAL_SUCCESS,
    payload: data
  }
}
export const actPersonalFail = (error) => {
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