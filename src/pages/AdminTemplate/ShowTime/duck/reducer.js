import * as ActionTypes from './constants';

const initialState = {
  loading: false,
  movieTheater: [],
  cluster: [],
  error: null
}

const showTimeInforReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.MOVIE_THEATER_REQUEST: {
      state.loading = true;
      state.movieTheater = [];
      state.error = null;
      return { ...state };
    }
    case ActionTypes.MOVIE_THEATER_SUCCESS: {
      state.loading = false;
      state.movieTheater = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.MOVIE_THEATER_FAIL: {
      state.loading = false;
      state.movieTheater = [];
      state.error = action.payload;
      return { ...state };
    }
    case ActionTypes.MOVIE_THEATER_CLUSTER_REQUEST: {
      state.loading = true;
      state.cluster = [];
      state.error = null;
      return { ...state };
    }
    case ActionTypes.MOVIE_THEATER_CLUSTER_SUCCESS: {
      state.loading = false;
      state.cluster = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.MOVIE_THEATER_CLUSTER_FAIL: {
      state.loading = false;
      state.cluster = [];
      state.error = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
}
export default showTimeInforReducer;