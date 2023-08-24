import * as ActionTypes from './constants';
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


export const actFetchInfoHTRap = () => {
  return (dispatch) => {
    dispatch(actInfoHTRapRequest());
    api.get(`QuanLyRap/LayThongTinHeThongRap`)
      .then((result) => {
        dispatch(actInfoHTRapSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actInfoHTRapFail(error));
      })
  }
}

export const actGetCumRap = (maHeThongRap) => {
  return (dispatch) => {
    dispatch(actGetCumRapRequest());
    api.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
      .then((result) => {
        dispatch(actGetCumRapSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actGetCumRapFail(error));
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
//GET HT RAP
const actInfoHTRapRequest = () => {
  return {
    type: ActionTypes.INFO_HT_RAP_REQUEST,
  };
}

const actInfoHTRapSuccess = (data) => {
  return {
    type: ActionTypes.INFO_HT_RAP_SUCCESS,
    payload: data
  };
}

const actInfoHTRapFail = (error) => {
  return {
    type: ActionTypes.INFO_HT_RAP_FAIL,
    payload: error
  };
}
//GET CUM RAP
const actGetCumRapRequest = () => {
  return {
    type: ActionTypes.INFO_CUM_RAP_REQUEST,
  };
}

const actGetCumRapSuccess = (data) => {
  return {
    type: ActionTypes.INFO_CUM_RAP_SUCCESS,
    payload: data
  };
}

const actGetCumRapFail = (error) => {
  return {
    type: ActionTypes.INFO_CUM_RAP_FAIL,
    payload: error
  };
}