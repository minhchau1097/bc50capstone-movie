import { LIST_MOVIE_FAIL, LIST_MOVIE_REQUEST, LIST_MOVIE_SUCCESS } from "./constants";
import api from "../../../../utils/api";

export const fetchListMovie =()=>{
    return(dispatch)=>{
        dispatch(actListMovieRequest())
        api.get('QuanLyPhim/LayDanhSachPhim?maNhom=GP03')
        .then((result)=>{
            if (result.data.statusCode === 200) {
                dispatch(actListMovieSuccess(result.data.content));
              }
        })
        .catch((error) => {
            dispatch(actListMovieFail(error))
          })
    }
}

const actListMovieRequest =()=>{
    return{
        type: LIST_MOVIE_REQUEST

    }
}

const actListMovieSuccess =(data)=>{
    return{
        type: LIST_MOVIE_SUCCESS,
        payload: data
    }
}
const actListMovieFail =(error)=>{
    return{
        type: LIST_MOVIE_FAIL,
        payload: error
    }
}