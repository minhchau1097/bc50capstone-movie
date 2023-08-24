import * as ActionTypes from './constants';

const initailState = {
  loading: false,
  data: null,
  error: null
}

const editFilmsReducer = (state = initailState, action) => {
  switch (action.type) {
    case ActionTypes.EDIT_FILMS_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.EDIT_FILMS_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.EDIT_FILMS_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    case ActionTypes.EDIT_FILMS_CLEAR: {
      state.loading = false;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    default:
      return { ...state };
  }
}
export default editFilmsReducer;