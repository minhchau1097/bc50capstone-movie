import * as ActionTypes from './constants';

const initialState = {
  loading: false,
  data: null,
  dataEdit: null,
  error: null,
  personalInfo: undefined,
}

const personalInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PERSONAL_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.PERSONAL_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.PERSONAL_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state }
    }
    case ActionTypes.PERSONAL_INFO: {
      state.personalInfo = action.payload;
      return { ...state }
    }
    //EDIT
    case ActionTypes.EDIT_PERSONAL_REQUEST: {
      state.loading = true;
      state.dataEdit = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.EDIT_PERSONAL_SUCCESS: {
      state.loading = false;
      state.dataEdit = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.EDIT_PERSONAL_FAIL: {
      state.loading = false;
      state.dataEdit = null;
      state.error = action.payload;
      return { ...state }
    }

    default:
      return { ...state }
  }
}

export default personalInfoReducer;