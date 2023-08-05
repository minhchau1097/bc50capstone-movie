import { LICHCHIEU_REQUEST, LICHCHIEU_SUCCESS, LICHCHIEU_FAIL } from './constants';
import api from "utils/api";

export const actFetchLichChieu = () => {
  return (dispatch) => {
    dispatch(actLichChieuRequest());
    api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP03")
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actLichChieuSuccess(result.data.content));
        }
      })
      .catch((error) => {
        dispatch(actLichChieuFail(error));
      })
  }
}


const actLichChieuRequest = () => {
  return {
    type: LICHCHIEU_REQUEST,
  };
}

const actLichChieuSuccess = (data) => {
  return {
    type: LICHCHIEU_SUCCESS,
    payload: data
  };
}

const actLichChieuFail = (error) => {
  return {
    type: LICHCHIEU_FAIL,
    payload: error
  };
}