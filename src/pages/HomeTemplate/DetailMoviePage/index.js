import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDetailMovie, getComments, postComment } from "./duck/actions";
import Trailer from "../Trailer";
import { PlayCircleOutlined } from "@ant-design/icons";
import { ConfigProvider, Rate, Tabs } from "antd";
import moment from "moment";
import Loader from "Loader";
import { DOMAIN_IMG } from "utils/api";
import { actFetchLichChieu } from "../HomePage/LichChieu/duck/actions";
import MoviesItem from "components/MoviesItem";
import Comments from "components/Comments";
import { RenderTabs } from "components/TabMovieTheater";

export default function DetailMoviePage() {
  const param = useParams();
  const { data, loading, comments } = useSelector(
    (state) => state.detailMovieReducer
  );
  const movies = useSelector((state) => state.lichChieuReducer);
  const dispatch = useDispatch();
  const [tabPosition, setTabPosition] = useState("left");
  const [status, setStatus] = useState(false);
  const user = JSON.parse(localStorage.getItem("Customer"));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("Customer")) {
      setStatus(true);
    }
    dispatch(fetchDetailMovie(param.id));
    dispatch(getComments(param.id));
    dispatch(actFetchLichChieu());
  }, []);

  if (loading) return <Loader value={50}></Loader>;
  const checkData = () => {
    if (data?.heThongRapChieu.length === 0) {
      return (
        <div className="text-center ">
          <h2 style={{ paddingTop: 60 }}>
            Xin lỗi quý khách , hiện tại chưa có lịch chiếu
          </h2>
        </div>
      );
    } else {
      return <RenderTabs data={data} />;
    }
  };

  return (
    <>
      <div className="bg-detail-movie">
        <div className="container ">
          <div className="detail-movie">
            <div className="row h-100 detail-movie-content">
              <div className="col-12  col-md-6  ">
                <div className="detail-movie-left mx-auto mx-md-0">
                  <img
                    className=" mr-auto"
                    style={{ height: 400, width: "100%" }}
                    src={data && DOMAIN_IMG + data.hinhAnh}
                    alt=""
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src =
                        "https://static.thenounproject.com/png/504708-200.png";
                      currentTarget.style.background = "#fff";
                      currentTarget.style.objectFit = "contain";
                    }}
                  />
                  {/* Button trigger modal */}
                  <button
                    className="play-trailer"
                    type="button"
                    onClick={() => {
                      dispatch({
                        type: "OPEN_FORM",
                        data: <Trailer trailer={data?.trailer} />,
                        open: true,
                      });
                    }}
                  >
                    <PlayCircleOutlined className="d-block" />
                  </button>
                </div>
              </div>
              <div className="col-12  col-md-6 mt-5  mt-md-0 detail-movie-right">
                <p>
                  Ngày khởi chiếu :{" "}
                  {moment(data && data.ngayKhoiChieu).format("DD - MM - YYYY")}
                </p>
                <h3 className="mt-3">{data && data.tenPhim}</h3>
                <p className="mt-3">{data && data.moTa}</p>
                <div className="d-flex justify-content-start  align-items-baseline mt-4">
                  <Rate disabled allowHalf value={data && data.danhGia / 2} />{" "}
                  <span className="ml-2 text-white font-semibold">
                    {data && data.danhGia}/10
                  </span>
                  <a
                    href="#detail-movie-theater"
                    className="btn btn-danger ml-3 ml-sm-5"
                  >
                    MUA VÉ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-detail-movie-theater">
        <div className="container">
          <div className="row w-100 mx-auto ">
            <div className=" col-12">
              <div id="detail-movie-theater">
                <ConfigProvider
                  theme={{
                    components: {
                      Tabs: {
                        inkBarColor: "#e4d804",
                        itemSelectedColor: "#e4d804",
                        itemHoverColor: "#e4d804",
                        // itemActiveColor: '#e4d804'
                      },
                    },
                  }}
                >
                  {checkData()}
                </ConfigProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-more-movies">
        <div className="container">
          <span>Phim chiếu rạp</span>
          <h3>Có thể bạn sẽ thích</h3>
          <MoviesItem movies={movies} param={param} />
        </div>
      </div>
      <div className="bg-detail-movie-comments">
        <div className="container">
          <div className="row w-100 mx-auto">
            <div className="col-12">
              <div className="detail-movie-comments">
                <div className="p-4">
                  <p className={comments.data?.length === 0 ? "mb-3" : "mb-0"}>
                    {comments.data
                      ? `Bình luận (${comments.data.length})`
                      : "Bình luận (0)"}
                  </p>
                  {status ? (
                    <form
                      className="d-flex mt-2 items-start "
                      onSubmit={(e) => {
                        e.preventDefault();
                        const data = {
                          maPhim: +param.id,
                          taiKhoan: user.taiKhoan,
                          noiDung: e.target[0].value,
                        };
                        dispatch(postComment(data));
                      }}
                    >
                      <textarea
                        style={{ backgroundColor: "#100f0fb8" }}
                        name=""
                        id=""
                        className="w-100   p-2 rounded"
                        placeholder="Nhập bình luận tại đây"
                      ></textarea>
                      <button type="submit" className="btn btn-danger ml-2">
                        Gửi
                      </button>
                    </form>
                  ) : (
                    <div className="text-center">
                      <Link to={"/auth"} className="btn ">
                        Đăng nhập để bình luận
                      </Link>
                    </div>
                  )}
                  <Comments comments={comments} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
