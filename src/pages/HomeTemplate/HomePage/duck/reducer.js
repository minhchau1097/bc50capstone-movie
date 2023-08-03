import { LIST_MOVIE_FAIL,LIST_MOVIE_REQUEST,LIST_MOVIE_SUCCESS } from "./constants";
const myState = {
    loading: false,
    data: null,
    error: null,
}

const listMovieReducer = (state = myState , action)=>{
switch (action.type) {
    case LIST_MOVIE_REQUEST:{
        state.loading = true;
        state.data = null;
        state.error=null;
        return {...state}
    }
        
    case LIST_MOVIE_SUCCESS:{
        state.loading = false;
        state.data = action.payload;
        state.error=null;
        return {...state}
    }
        
    case LIST_MOVIE_FAIL:{
        state.loading = false;
        state.data = null;
        state.error= action.payload;
        return {...state}
    }
        
    default:
        return {...state}
}
}

export default listMovieReducer;