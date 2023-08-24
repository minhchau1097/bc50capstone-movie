import * as ActionTypes from "./constants";
import api from "utils/api";

export const actGetMovieTheater = () => {
  return (dispatch) => {
    dispatch(actMovieTheaterRequest());
    api.get('QuanLyRap/LayThongTinHeThongRap')
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actMovieTheaterSuccess(result.data.content));
        }
      })
      .catch((error) => {
        dispatch(actMovieTheaterFail(error));
      })
  }
}
export const actGetMovieTheaterCluster = (id) => {
  return (dispatch) => {
    dispatch(actMovieTheaterClusterRequest());
    api.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`)
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actMovieTheaterClusterSuccess(result.data.content));
        }
      })
      .catch((error) => {
        dispatch(actMovieTheaterClusterFail(error));
      })
  }
}
export const actCreateCalendar = (value) => {
  return (dispatch) => {
    api.post(`QuanLyDatVe/TaoLichChieu`, value)
      .then((result) => {
        if (result.data.statusCode === 200) {
          alert(result.data.content)
        }
      })
      .catch((error) => {
        console.log(error)
        alert(error.response.data.message)
      })
  }
}


const actMovieTheaterRequest = () => {
  return {
    type: ActionTypes.MOVIE_THEATER_REQUEST,
  };
}

const actMovieTheaterSuccess = (data) => {
  return {
    type: ActionTypes.MOVIE_THEATER_SUCCESS,
    payload: data
  };
}

const actMovieTheaterFail = (error) => {
  return {
    type: ActionTypes.MOVIE_THEATER_FAIL,
    payload: error
  };
}
const actMovieTheaterClusterRequest = () => {
  return {
    type: ActionTypes.MOVIE_THEATER_CLUSTER_REQUEST,
  };
}

const actMovieTheaterClusterSuccess = (data) => {
  return {
    type: ActionTypes.MOVIE_THEATER_CLUSTER_SUCCESS,
    payload: data
  };
}

const actMovieTheaterClusterFail = (error) => {
  return {
    type: ActionTypes.MOVIE_THEATER_CLUSTER_FAIL,
    payload: error
  };
}