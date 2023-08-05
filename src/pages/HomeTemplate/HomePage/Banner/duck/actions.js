import { BANNER_MOVIE_FAIL,BANNER_MOVIE_REQUEST,BANNER_MOVIE_SUCCESS  } from "./constants";
import api from "utils/api";

export const fetchBannerMovie =()=>{
    return(dispatch)=>{
        dispatch(actBannerMovieRequest())
        api.get('QuanLyPhim/LayDanhSachBanner')
        .then((result)=>{
            if (result.data.statusCode === 200) {
                dispatch(actBannerMovieSuccess(result.data.content));
              }
        })
        .catch((error) => {
            dispatch(actBannerMovieFail(error))
          })
    }
}
const actBannerMovieRequest =()=>{
    return{
        type: BANNER_MOVIE_REQUEST

    }
}

const actBannerMovieSuccess =(data)=>{
    return{
        type: BANNER_MOVIE_SUCCESS,
        payload: data
    }
}
const actBannerMovieFail =(error)=>{
    return{
        type: BANNER_MOVIE_FAIL,
        payload: error
    }
}