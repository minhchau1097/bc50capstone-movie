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


export const getComments = (maPhim) => {
    return (dispatch) => {
        dispatch(actCommentRequest())
        api.get(`QuanLyBinhLuan/LayBinhLuanTheoPhim/${maPhim}`)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actCommentSuccess(result.data.content));
                }
            })
            .catch((error) => {
                dispatch(actCommentFail(error))
            })
    }
}
export const postComment =(data)=>{
    return(dispatch)=>{
        api.post('QuanLyBinhLuan/ThemBinhLuan',data)
        .then((result) => {
            if (result.data.statusCode === 201) {
                alert('Bình luận thành công')
                dispatch(getComments(data.maPhim))
            }
        })
        .catch((error) => {
            alert('Bình luận không thành công')
        })
    }
}
const actCommentRequest = () => {
    return {
        type: ActionTypes.COMMENT_REQUEST

    }
}

const actCommentSuccess = (data) => {
    return {
        type: ActionTypes.COMMENT_SUCCESS,
        payload: data
    }
}
const actCommentFail = (error) => {
    return {
        type: ActionTypes.COMMENT_FAIL,
        payload: error
    }
}
