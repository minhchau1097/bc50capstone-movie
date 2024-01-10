
import * as ActionTypes from "./constants";
import api from "utils/api";
export const actDeleteFilms = (id) => {
    return (dispatch) => {
        dispatch(actDeleteFilmsRequest())
        api.delete(`QuanLyPhim/XoaPhim?maPhim=${id}`)
        .then((result) => { 
            if (result.data.statusCode === 200) {
               dispatch(actDeleteFilmsSuccess(result.data.content))
                
          }
        })
        .catch((error)=>{
            dispatch(actDeleteFilmsFail(error))
        })
    }
}



const actDeleteFilmsRequest = () => {
    return {
        type: ActionTypes.DELETE_FILMS_REQUEST,
    };
}

const actDeleteFilmsSuccess = (data) => {
    return {
        type: ActionTypes.DELETE_FILMS_SUCCESS,
        payload: data
    };
}

const actDeleteFilmsFail = (error) => {
    return {
        type: ActionTypes.DELETE_FILMS_FAIL,
        payload: error
    };
}
export const actClearDeleteFilms = () => {
    return {
        type: ActionTypes.CLEAR_DELETE_FILMS,
        payload: null
    };
}
