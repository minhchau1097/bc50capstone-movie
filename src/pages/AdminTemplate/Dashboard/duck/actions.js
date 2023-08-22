import * as ActionType from './constants';
import api from 'utils/api';



export const actManageUser = () => {
  return (dispatch) => {
    dispatch(actUserRequest());
    api.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01")
      .then((result) => {
        // console.log(result.data.content);
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
          alert('Thêm người dùng thành công');
          navigate("/admin/dashboard", { replace: true });
        }
      })
      .catch((error) => {
        dispatch(actAddUserFail(error));
      })
  }
}


export const actEditUser = (navigate) => {
  return (dispatch) => {
    dispatch(actEditUserRequest());
    api.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung")
      .then((result) => {
        if (result.data.statusCode === 200) {
          dispatch(actEditUserSuccess(result.data.content));
          alert('Sửa thông tin người dùng thành công');
          navigate("/admin/dashboard", { replace: true });
        }
      })
      .catch((error) => {
        dispatch(actEditUserFail(error));
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