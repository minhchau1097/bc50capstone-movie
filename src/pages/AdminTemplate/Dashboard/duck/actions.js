import { replace } from 'formik';
import * as ActionType from './constants';
import api from 'utils/api';



export const actManageUser = (taiKhoan = '') => {
  return (dispatch) => {
    dispatch(actUserRequest());
    if (taiKhoan !== '') {
      return api.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan}`, taiKhoan)
        .then((result) => {
          dispatch(actUserSuccess(result.data.content));
        })
        .catch((error) => {
          dispatch(actUserFail(error));
        })
    }
    return api.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01")
      .then((result) => {
        dispatch(actUserSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actUserFail(error));
      })
  }
}


export const actAddUser = (formData, navigate) => {
  return (dispatch) => {
    dispatch(actAddUserRequest());
    api.post("QuanLyNguoiDung/ThemNguoiDung", formData)
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actAddUserSuccess(result.data.content));
          alert(result.data.message);
          navigate("/admin/dashboard", { replace: true });
        }
      })
      .catch((error) => {
        dispatch(actAddUserFail(error));
      })
  }
}


export const actEditUser = (info, navigate) => {
  return (dispatch) => {
    dispatch(actEditUserRequest());
    api.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", info)
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actEditUserSuccess(result.data.content));
          alert(result.data.message);
          navigate("/admin/dashboard", { replace: true });
        }
      })
      .catch((error) => {
        dispatch(actEditUserFail(error));
      })
  }
}


export const actDeleteUser = (account) => {
  return (dispatch) => {
    dispatch(actDeleteUserRequest());
    api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`)
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actDeleteUserSuccess(result.data.content));
        }
      })
      .catch((error) => {
        dispatch(actDeleteUserFail(error));
      })
  }
}


const actUserRequest = () => {
  return {
    type: ActionType.MANAGE_USER_REQUEST,
  }
}
const actUserSuccess = (data) => {
  return {
    type: ActionType.MANAGE_USER_SUCCESS,
    payload: data
  }
}
const actUserFail = (error) => {
  return {
    type: ActionType.MANAGE_USER_FAIL,
    payload: error
  }
}
//ADD-USER
const actAddUserRequest = () => {
  return {
    type: ActionType.ADD_USER_REQUEST,
  }
}
const actAddUserSuccess = (data) => {
  return {
    type: ActionType.ADD_USER_FAIL,
    payload: data
  }
}
const actAddUserFail = (error) => {
  return {
    type: ActionType.ADD_USER_FAIL,
    payload: error
  }
}
//EDIT_USER
const actEditUserRequest = () => {
  return {
    type: ActionType.EDIT_USER_REQUEST,
  }
}
const actEditUserSuccess = (data) => {
  return {
    type: ActionType.EDIT_USER_SUCCESS,
    payload: data
  }
}
const actEditUserFail = (error) => {
  return {
    type: ActionType.EDIT_USER_FAIL,
    payload: error
  }
}
export const actUpdateSelectUser = (data) => {
  return {
    type: ActionType.SELECT_USER,
    payload: data
  }
}
//DELETE
const actDeleteUserRequest = () => {
  return {
    type: ActionType.DELETE_USER_REQUEST,
  }
}
const actDeleteUserSuccess = (data) => {
  return {
    type: ActionType.DELETE_USER_SUCCESS,
    payload: data
  }
}
const actDeleteUserFail = (error) => {
  return {
    type: ActionType.DELETE_USER_FAIL,
    payload: error
  }
}