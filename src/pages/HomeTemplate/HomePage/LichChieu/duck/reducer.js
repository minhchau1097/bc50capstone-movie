import * as ActionTypes from './constants';

const stateLichChieu = {
  loading: false,
  data: null,
  error: null,
  heThongRapChieu: [],
  cumRapChieu: []
}

const lichChieuReducer = (state = stateLichChieu, action) => {
  switch (action.type) {
    case ActionTypes.LICHCHIEU_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.LICHCHIEU_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.LICHCHIEU_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    //HT RẠP
    case ActionTypes.INFO_HT_RAP_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.INFO_HT_RAP_SUCCESS: {
      state.loading = false;
      state.heThongRapChieu = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.INFO_HT_RAP_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    //CUM RẠP
    case ActionTypes.INFO_CUM_RAP_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.INFO_CUM_RAP_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.INFO_CUM_RAP_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
}
export default lichChieuReducer;