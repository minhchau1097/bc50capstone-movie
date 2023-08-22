import * as ActionTypes from "./constants";
import api from "utils/api";

export const actGetAddNewFilms = (formData) => {
  return (dispatch) => {
    dispatch(actAddNewFilmsRequest());
    api.post("QuanLyPhim/ThemPhimUploadHinh", formData)
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actAddNewFilmsSuccess(result.data.message));
          
        }
      })
      .catch((error) => {
        dispatch(actAddNewFilmsFail(error));
      })
  }
}


const actAddNewFilmsRequest = () => {
  return {
    type: ActionTypes.ADD_NEW_FILMS_REQUEST,
  };
}

const actAddNewFilmsSuccess = (data) => {
  return {
    type: ActionTypes.ADD_NEW_FILMS_SUCCESS,
    payload: data
  };
}

const actAddNewFilmsFail = (error) => {
  return {
    type: ActionTypes.ADD_NEW_FILMS_FAIL,
    payload: error
  };
}
export const actClearNewFilms = (navigate) => {
  navigate('/admin/films', {replace : true})
  return {
    type: ActionTypes.CLEAR_NEW_FILMS,
    payload: null
  };
}