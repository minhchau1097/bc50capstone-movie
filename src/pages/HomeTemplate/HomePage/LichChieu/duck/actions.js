import { LICHCHIEU_REQUEST, LICHCHIEU_SUCCESS, LICHCHIEU_FAIL, INFO_LICHCHIEU_REQUEST, INFO_LICHCHIEU_SUCCESS, INFO_LICHCHIEU_FAIL } from './constants';
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


export const actFetchInfoLichChieu = (id) => {
  return (dispatch) => {
    dispatch(actInfoLichChieuRequest());
    api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
      .then((result) => {
        dispatch(actInfoLichChieuSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actInfoLichChieuFail(error));
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

const actInfoLichChieuRequest = () => {
  return {
    type: INFO_LICHCHIEU_REQUEST,
  };
}

const actInfoLichChieuSuccess = (data) => {
  return {
    type: INFO_LICHCHIEU_SUCCESS,
    payload: data
  };
}

const actInfoLichChieuFail = (error) => {
  return {
    type: INFO_LICHCHIEU_FAIL,
    payload: error
  };
}