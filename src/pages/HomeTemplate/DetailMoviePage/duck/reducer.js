import { DETAIL_MOVIE_FAIL,DETAIL_MOVIE_REQUEST,DETAIL_MOVIE_SUCCESS } from "./constants";
const myState = {
    loading: false,
    data: null,
    error: null,
}

const detailMovieReducer = (state = myState , action)=>{
switch (action.type) {
    case DETAIL_MOVIE_REQUEST:{
        state.loading = true;
        state.data = null;
        state.error=null;
        return {...state}
    }
        
    case DETAIL_MOVIE_SUCCESS:{
        state.loading = false;
        state.data = action.payload;
        state.error=null;
        return {...state}
    }
        
    case DETAIL_MOVIE_FAIL:{
        state.loading = false;
        state.data = null;
        state.error= action.payload;
        return {...state}
    }
        
    default:
        return {...state}
}
}

export default detailMovieReducer;