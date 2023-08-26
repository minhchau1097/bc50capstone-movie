import * as ActionTypes from './constants';
import api from 'utils/api';

export const actFetchPersonalInfo = () => {
  return (dispatch) => {
    dispatch(actPersonalRequest());
    api.post('QuanLyNguoiDung/ThongTinTaiKhoan')
      .then((result) => {
        dispatch(actPersonalSuccess(result.data.content))
      }).catch((error) => {
        dispatch(actPersonalFail(error))
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