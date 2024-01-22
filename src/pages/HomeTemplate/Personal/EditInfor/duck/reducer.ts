import { Action, AppStateAcount } from "type/type";
import * as ActionTypes from "./constant";
const myState: AppStateAcount<string> = {
    loading: false,
    data: null,
    error: null,

}

const UpdateDetailUserReducer = (state = myState, action: Action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_DETAIL_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state }
        }

        case ActionTypes.UPDATE_DETAIL_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state }
        }

        case ActionTypes.UPDATE_DETAIL_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state }
        }
        case ActionTypes.CLEAR_NOTE: {
            state.loading = false;
            state.data = null;
            state.error = null;
            return { ...state }
        }
        default:
            return { ...state }
    }
}

export default UpdateDetailUserReducer;