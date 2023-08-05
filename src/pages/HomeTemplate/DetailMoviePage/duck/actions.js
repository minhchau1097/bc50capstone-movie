import { DETAIL_MOVIE_FAIL,DETAIL_MOVIE_REQUEST,DETAIL_MOVIE_SUCCESS  } from "./constants";
import api from "utils/api";

export const fetchDetailMovie =(id)=>{
    return(dispatch)=>{
        dispatch(actDetailMovieRequest())
        api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
        .then((result)=>{
            if (result.data.statusCode === 200) {
                dispatch(actDetailMovieSuccess(result.data.content));
              }
        })
        .catch((error) => {
            dispatch(actDetailMovieFail(error))
          })
    }
}

const actDetailMovieRequest =()=>{
    return{
        type: DETAIL_MOVIE_REQUEST

    }
}

const actDetailMovieSuccess =(data)=>{
    return{
        type: DETAIL_MOVIE_SUCCESS,
        payload: data
    }
}
const actDetailMovieFail =(error)=>{
    return{
        type: DETAIL_MOVIE_FAIL,
        payload: error
    }
}