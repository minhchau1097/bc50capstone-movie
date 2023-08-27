import * as ActionTypes from './constants';
import api from "utils/api";

export const actFetchLichChieu = (tenPhim = '') => {
  return (dispatch) => {
    dispatch(actLichChieuRequest());
    if (tenPhim.trim() != '') {
      api.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP03&tenPhim=${tenPhim}`)
        .then((result) => {
          if (result.data.statusCode === 200) {
            dispatch(actLichChieuSuccess(result.data.content));
          }
        })
        .catch((error) => {
          dispatch(actLichChieuFail(error));
        })
    } else {
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
}


export const actFetchInfoCumRap = () => {
  return (dispatch) => {
    dispatch(actFetInfoCumRapRequest());
    api.get(`QuanLyRap/LayThongTinHeThongRap`)
      .then((result) => {
        // console.log(result.data.content);
        if (result.data.statusCode === 200) {
          dispatch(actFetInfoCumRapSuccess(result.data.content));          
        }
      })
      .catch((error) => {
        dispatch(actFetInfoCumRapFail(error));
      })
  }
}


export const actNgayGioChieu = (id) => {
  return (dispatch) => {
    dispatch(actNgayGioChieuRequest());
    api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
      .then((result) => {
        // console.log(result.data.content);
        dispatch(actNgayGioChieuSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actNgayGioChieuFail(error));
      })
  }
}



const actLichChieuRequest = () => {
  return {
    type: ActionTypes.LICHCHIEU_REQUEST,
  };
}

const actLichChieuSuccess = (data) => {
  return {
    type: ActionTypes.LICHCHIEU_SUCCESS,
    payload: data
  };
}

const actLichChieuFail = (error) => {
  return {
    type: ActionTypes.LICHCHIEU_FAIL,
    payload: error
  };
}
//GET INFO PHIM
const actFetInfoCumRapRequest = () => {
  return {
    type: ActionTypes.INFO_CUM_RAP_REQUEST,
  };
}

const actFetInfoCumRapSuccess = (data) => {
  return {
    type: ActionTypes.INFO_CUM_RAP_SUCCESS,
    payload: data
  };
}

const actFetInfoCumRapFail = (error) => {
  return {
    type: ActionTypes.INFO_CUM_RAP_FAIL,
    payload: error
  };
}


//GET CUM RAP
const actNgayGioChieuRequest = () => {
  return {
    type: ActionTypes.DATE_REQUEST,
  };
}

const actNgayGioChieuSuccess = (data) => {
  return {
    type: ActionTypes.DATE_SUCCESS,
    payload: data
  };
}

const actNgayGioChieuFail = (error) => {
  return {
    type: ActionTypes.DATE_FAIL,
    payload: error
  };
}