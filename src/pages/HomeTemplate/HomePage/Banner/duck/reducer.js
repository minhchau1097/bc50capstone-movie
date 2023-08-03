import { BANNER_MOVIE_FAIL,BANNER_MOVIE_REQUEST,BANNER_MOVIE_SUCCESS } from "./constants";
const myState = {
    loading: false,
    data: null,
    error: null,
}

const bannerMovieReducer = (state = myState , action)=>{
switch (action.type) {
    case BANNER_MOVIE_REQUEST:{
        state.loading = true;
        state.data = null;
        state.error=null;
        return {...state}
    }
        
    case BANNER_MOVIE_SUCCESS:{
        state.loading = false;
        state.data = action.payload;
        state.error=null;
        return {...state}
    }
        
    case BANNER_MOVIE_FAIL:{
        state.loading = false;
        state.data = null;
        state.error= action.payload;
        return {...state}
    }
        
    default:
        return {...state}
}
}

export default bannerMovieReducer;