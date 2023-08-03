import * as ActionType from "./constants";
const myState = {
    loading: false,
    data: null,
    error: null,
}

const listMovieTheaterReducer = (state = myState , action)=>{
switch (action.type) {
    case ActionType.THEATER_MOVIE_REQUEST:{
        state.loading = true;
        state.data = null;
        state.error=null;
        return {...state}
    }
        
    case ActionType.THEATER_MOVIE_SUCCESS:{
        state.loading = false;
        state.data = action.payload;
        state.error=null;
        return {...state}
    }
        
    case ActionType.THEATER_MOVIE_FAIL:{
        state.loading = false;
        state.data = null;
        state.error= action.payload;
        return {...state}
    }
        
    default:
        return {...state}
}
}

export default listMovieTheaterReducer;