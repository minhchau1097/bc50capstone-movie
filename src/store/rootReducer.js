import { combineReducers } from "redux";    
// import listMovieReducer from "../pages/HomeTemplate/HomePage/duck/reducer";
import bannerMovieReducer from "../pages/HomeTemplate/HomePage/Banner/duck/reducer";
import detailMovieReducer from "../pages/HomeTemplate/DetailMoviePage/duck/reducer";
import listMovieTheaterReducer from "../pages/HomeTemplate/HomePage/MovieTheater/duck/reducer";
import loginReducer from "../pages/AdminTemplate/LoginPage/duck/reducer";
import lichChieuReducer from './../pages/HomeTemplate/HomePage/LichChieu/duck/reducer';
const rootReducer = combineReducers({
    //child
    // listMovieReducer,
    lichChieuReducer,
    bannerMovieReducer,
    detailMovieReducer,
    listMovieTheaterReducer,
    loginReducer
})


export default rootReducer;