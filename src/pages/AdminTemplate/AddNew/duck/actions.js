
import api from "utils/api";

export const actGetAddNewFilms = (formData, navigate) => {
  return (dispatch) => {
    api.post("QuanLyPhim/ThemPhimUploadHinh", formData)
      .then((result) => {
        if (result.data.statusCode === 201) {
          alert(result.data.message);
          navigate('/admin/films', {replace : true})
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      })
  }
}

