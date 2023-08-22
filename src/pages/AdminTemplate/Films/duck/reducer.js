import * as ActionTypes from "./constants";
const initailState = {
  loading: false,
  data: null,
  error: null
}

const deleteFilmsReducer = (state = initailState, action) => {
  switch (action.type) {
    case ActionTypes.DELETE_FILMS_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.DELETE_FILMS_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.DELETE_FILMS_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    case ActionTypes.CLEAR_DELETE_FILMS: {
      state.loading = false;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    default:
      return { ...state };
  }
}
export default deleteFilmsReducer;