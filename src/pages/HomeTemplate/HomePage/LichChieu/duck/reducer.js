import { LICHCHIEU_REQUEST, LICHCHIEU_SUCCESS, LICHCHIEU_FAIL } from './constants';

const stateLichChieu = {
  loading: false,
  data: null,
  error: null
}

const lichChieuReducer = (state = stateLichChieu, action) => {
  switch (action.type) {
    case LICHCHIEU_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case LICHCHIEU_SUCCESS: {
      state.loading = true;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case LICHCHIEU_FAIL: {
      state.loading = true;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
}
export default lichChieuReducer;