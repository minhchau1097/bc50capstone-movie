import { ConfigProvider, Tabs } from "antd";
import moment from "moment";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { DOMAIN_IMG } from "utils/api";

export function RenderTabs({ data }) {
  const items = data?.heThongRapChieu.map((item, index) => {
    return {
      key: index,
      label: (
        <div key={index} className="theater-logo">
          <img
            src={item.logo}
            alt={item.tenHeThongRap}
            title={item.tenHeThongRap}
          />
        </div>
      ),
      children: (
        <Fragment>
          {item.cumRapChieu.map((item1, index) => {
            return (
              <div key={index} className="theater-title">
                <div>
                  <p>{item1.tenCumRap}</p>
                  <p>{item1.diaChi}</p>
                </div>
                <div key={index} className=" mt-2 theater-movie-date">
                  {item1.lichChieuPhim.map((item2, index) => {
                    return (
                      <Fragment key={index}>
                        <Link
                          to={`/booking-ticket/${item2.maLichChieu}`}
                          className="movie-date"
                        >
                          {moment(item2.ngayChieuGioChieu).format("h:mmA")}
                        </Link>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Fragment>
      ),
    };
  });
  return <Tabs tabPosition={"left"} defaultActiveKey="1" items={items}></Tabs>;
}
export function RenderTabsMovie({ data }) {
  const tabs = data?.map((item, index) => {
    return {
      label: (
        <div className="movie-theater-logo">
          <img
            style={{ width: 50, height: 50 }}
            src={item.logo}
            alt={item.tenHeThongRap}
          />{" "}
        </div>
      ),
      key: index,
      children: (
        <Tabs
          items={item.lstCumRap?.map((item1, index) => {
            return {
              label: (
                <div style={{ flexGrow: 1 }}>
                  <div
                    className="text-left movie-theater-title "
                    style={{ width: 280, height: 50 }}
                  >
                    <p className="movie-theater-name">{item1.tenCumRap}</p>
                    <p className="movie-theater-address">{item1.diaChi}</p>
                  </div>
                </div>
              ),
              key: index,
              children: (
                <div className="hover:overflow-y-scroll transition-all h-[720px]">
                  {item1.danhSachPhim.map((item2, index) => {
                    return (
                      <div
                        className={`flex flex-row movie-theater-box  ${
                          index >= 1 ? "mt-4" : ""
                        }`}
                        key={index}
                      >
                        <img
                          src={DOMAIN_IMG + item2.hinhAnh}
                          alt={item2.tenPhim}
                          style={{
                            width: 100,
                            height: 130,
                            borderRadius: 12,
                            objectFit: "cover",
                          }}
                        />
                        <div className="pl-4 w-[320px]">
                          <p className="movie-theater-movie-name mb-3">
                            <span>T18</span>
                            {item2.tenPhim}
                          </p>
                          <div className="movie-theater-movie-date">
                            {item2.lstLichChieuTheoPhim
                              .slice(0, 4)
                              .map((item3, index) => {
                                return (
                                  <Link
                                    to={`/booking-ticket/${item3.maLichChieu}`}
                                    className="movie-date"
                                    key={index}
                                  >
                                    {moment(item3.ngayChieuGioChieu).format(
                                      "h:mmA"
                                    )}
                                  </Link>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ),
            };
          })}
          style={{ height: 720 }}
          tabPosition="left"
        ></Tabs>
      ),
    };
  });
  return (
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
      <Tabs id="movie-theater" tabPosition={"left"} items={tabs}></Tabs>
    </ConfigProvider>
  );
}
