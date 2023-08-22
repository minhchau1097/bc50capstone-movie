import * as ActionTypes from "./constants";
import api from "utils/api";

export const actGetEditFilms = (id) => {
  return (dispatch) => {
    dispatch(actEditFilmsRequest());
    api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actEditFilmsSuccess(result.data.content));
        }
      })
      .catch((error) => {
        dispatch(actEditFilmsFail(error));
      })
  }
}
export const actUpdateEditFilms = (formData, navigate) => {
  return (dispatch) => {
    api.post('QuanLyPhim/CapNhatPhimUpload', formData)
      .then((result) => {
        console.log(result)
        alert(result.data.message)
        navigate('/admin/films', {replace : true})
      })
      .catch((error) => { 
        alert(error.response.data.content)
      })
  }
}

const actEditFilmsRequest = () => {
  return {
    type: ActionTypes.EDIT_FILMS_REQUEST,
  };
}

const actEditFilmsSuccess = (data) => {
  return {
    type: ActionTypes.EDIT_FILMS_SUCCESS,
    payload: data
  };
}

const actEditFilmsFail = (error) => {
  return {
    type: ActionTypes.EDIT_FILMS_FAIL,
    payload: error
  };
}