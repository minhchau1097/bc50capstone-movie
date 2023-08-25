import * as ActionTypes from './constants';

const stateLichChieu = {
  loading: false,
  data: null,
  error: null,
  cumRap: null,
  ngayGioChieu: null,
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
    
    //CỤM RẠP
    case ActionTypes.INFO_CUM_RAP_REQUEST: {
      state.loading = true;
      state.cumRap = null;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.INFO_CUM_RAP_SUCCESS: {
      state.loading = false;
      state.cumRap = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.INFO_CUM_RAP_FAIL: {
      state.loading = false;
      state.cumRap = null;
      state.error = action.payload;
      return { ...state };
    }
    //NGAY GIO CHIEU
    case ActionTypes.DATE_REQUEST: {
      state.loading = true;
      state.ngayGioChieu = null;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.DATE_SUCCESS: {
      state.loading = false;
      state.ngayGioChieu = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.DATE_FAIL: {
      state.loading = false;
      state.ngayGioChieu = null;
      state.error = action.payload;
      return { ...state };
    }
    

    default:
      return { ...state };
  }
}
export default lichChieuReducer;