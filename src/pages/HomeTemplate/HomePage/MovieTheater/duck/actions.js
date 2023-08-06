import * as ActionType from "./constants";
import api from "utils/api";

export const fetchMovieTheater = () => {
    return (dispatch) => {
        dispatch(actMovieTheaterRequest())
        api.get('QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP06')
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actMovieTheaterSuccess(result.data.content));
                }
            })
            .catch((error) => {
                dispatch(actMovieTheaterFail(error))
            })
    }
}


const actMovieTheaterRequest = () => {
    return {
        type: ActionType.THEATER_MOVIE_REQUEST

    }
}

const actMovieTheaterSuccess = (data) => {
    return {
        type: ActionType.THEATER_MOVIE_SUCCESS,
        payload: data
    }
}
const actMovieTheaterFail = (error) => {
    return {
        type: ActionType.THEATER_MOVIE_FAIL,
        payload: error
    }
}