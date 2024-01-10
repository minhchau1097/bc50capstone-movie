import * as ActionTypes from "./constants";
import api from "utils/api";

export const fetchDetailMovie = (id) => {
    return (dispatch) => {
        dispatch(actDetailMovieRequest())
        api.get(`QuanLyRap/LayThongTinLichChieuPhim?maPhim=${id}`)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actDetailMovieSuccess(result.data.content));
                }
            })
            .catch((error) => {
                dispatch(actDetailMovieFail(error))
            })
    }
}

const actDetailMovieRequest = () => {
    return {
        type: ActionTypes.DETAIL_MOVIE_REQUEST

    }
}

const actDetailMovieSuccess = (data) => {
    return {
        type: ActionTypes.DETAIL_MOVIE_SUCCESS,
        payload: data
    }
}
const actDetailMovieFail = (error) => {
    return {
        type: ActionTypes.DETAIL_MOVIE_FAIL,
        payload: error
    }
}
