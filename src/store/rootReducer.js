import { combineReducers } from "redux";
// import listMovieReducer from "../pages/HomeTemplate/HomePage/duck/reducer";
import bannerMovieReducer from "../pages/HomeTemplate/HomePage/Banner/duck/reducer";
import detailMovieReducer from "../pages/HomeTemplate/DetailMoviePage/duck/reducer";
import listMovieTheaterReducer from "../pages/HomeTemplate/HomePage/MovieTheater/duck/reducer";
import loginReducer from "../pages/AdminTemplate/LoginPage/duck/reducer";
import lichChieuReducer from './../pages/HomeTemplate/HomePage/LichChieu/duck/reducer';
import registerReducer from './../pages/AdminTemplate/RegisterPage/duck/reducer';
import bookingTicketReducer from './../pages/HomeTemplate/BookingTicketPage/duck/reducer';
import modalReducer from "pages/HOC-Modal/duck/reducer";
import deleteFilmsReducer from "pages/AdminTemplate/Films/duck/reducer";
import editFilmsReducer from "pages/AdminTemplate/EditFilms/duck/reducer";
import manageUserReducer from './../pages/AdminTemplate/Dashboard/duck/reducer';
import showTimeInforReducer from "pages/AdminTemplate/ShowTime/duck/reducer";
const rootReducer = combineReducers({
    //child
    // listMovieReducer,
    lichChieuReducer,
    bannerMovieReducer,
    detailMovieReducer,
    listMovieTheaterReducer,
    loginReducer,
    registerReducer,
    bookingTicketReducer,
    modalReducer,
    deleteFilmsReducer,
    editFilmsReducer,
    manageUserReducer,
    showTimeInforReducer,
})


export default rootReducer;