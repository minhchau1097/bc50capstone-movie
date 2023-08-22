import * as ActionTypes from './constants';

const initailState = {
  loading: false,
  data: null,
  error: null
}

const addNewFilmsReducer = (state = initailState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_FILMS_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.ADD_NEW_FILMS_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.ADD_NEW_FILMS_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    case ActionTypes.CLEAR_NEW_FILMS: {
      state.loading = false;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    default:
      return { ...state };
  }
}
export default addNewFilmsReducer;