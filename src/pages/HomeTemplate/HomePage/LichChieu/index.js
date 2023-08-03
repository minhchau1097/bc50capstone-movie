import React, { Component } from 'react'
import LichChieuItem from "./LichChieuItem";
import Slider from "react-slick";
import Swal from 'sweetalert2';
import { actFetchLichChieu } from './duck/actions';
import { connect } from 'react-redux';

class LichChieu extends Component {
  componentDidMount() {
    this.props.fetchLichChieu();
  }

  renderListLichChieu = () => {
    const { data } = this.props;
    return data?.map((movie) => <div key={movie.maPhim}><LichChieuItem movie={movie} /></div>)
  }
  handlePopUp = () => {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      speed: 500,
      rows: 2,
      slidesPerRow: 4,
      arrows: false,
    };
    return (
      <div className='container'>
        <div className="headerTitle titleLichChieu">
          <div className='row container'>
            <div className="under-line col-md-3">
              <div className="form-group mt-4">
                <select className="form-control" name="">
                  <option>Phim</option>
                  <option></option>
                </select>
              </div>
            </div>
            <div className="under-line col-md-3 partition">
              <div className="form-group mt-4">
                <select className="form-control" name="">
                  <option>Rạp</option>
                  <option></option>
                  <option></option>
                </select>
              </div>
            </div>
            <div className="under-line col-md-3 partition">
              <div className="form-group mt-4">
                <select className="form-control" name="">
                  <option>Ngày giờ chiếu</option>
                  <option></option>
                  <option></option>
                </select>
              </div>
            </div>
            <div className='col-md-3 partition'>
              {/* dùng sweet alert để hiện box */}
              <button className="btnMuaVe" onClick={() => {
                this.handlePopUp()
              }}>MUA VÉ NGAY</button>
            </div>
          </div>
        </div>
        <Slider {...settings}>
          {this.renderListLichChieu()}
        </Slider>
        <div className='container mt-5'>
          <img src="./images/shadow.png" alt="" width={1080} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.lichChieuReducer.loading,
    data: state.lichChieuReducer.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLichChieu: () => {
      dispatch(actFetchLichChieu());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LichChieu);