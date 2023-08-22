import React, { useEffect } from 'react'
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchLichChieu } from 'pages/HomeTemplate/HomePage/LichChieu/duck/actions';
import { CalendarOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { NavLink, Navigate } from 'react-router-dom';
import { actClearDeleteFilms, actDeleteFilms } from './duck/action';
export default function ListMovie() {
  const dispatch = useDispatch()
  const films = useSelector((state) => state.lichChieuReducer.data)
  const data = useSelector(state => state.deleteFilmsReducer.data)
  useEffect(() => {
    dispatch(actFetchLichChieu());
  }, [])
  useEffect(() => {
    if (data) {

      alert(data);
      dispatch(actFetchLichChieu());
      dispatch(actClearDeleteFilms())
    }
  }, [data])

  const handleDelete = (id) => {
    dispatch(actDeleteFilms(id))
  }

  const columns = [
    {
      title: 'Mã phim',
      dataIndex: 'maPhim',
      fixed: true,
      width: 50,
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend'],
    },
    {

      title: 'Tên phim',
      dataIndex: 'tenPhim',
      defaultSortOrder: 'descend',
      width: 100,
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1
      },

    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      width: 100,
      render: (text, films, index) => {
        return <img style={{ height: 80, width: 80 }} src={films.hinhAnh} alt={films.tenPhim} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photo/id/${index}/50/50` }} />
      }

    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      width: 150,
      ellipsis: {
        showTitle: false,
      },

    },
    {
      title: 'Hành động',
      dataIndex: 'hanhDong',
      width: 100,

    }
  ];

  const renderData = () => {
    let data = films?.map((item, index) => {
      return {
        key: index,
        maPhim: item.maPhim,
        tenPhim: item.tenPhim,
        hinhAnh: item.hinhAnh,
        moTa: item.moTa,
        hanhDong: <div className='d-flex' style={{ gap: 12, fontSize: 20 }}>
          <NavLink title='Cập nhật phim' to={`/admin/films/edit/${item.maPhim}`} className='text-primary'> <EditOutlined /></NavLink>
          <button title='Xoá phim' className='text-danger' onClick={() => {
            handleDelete(item.maPhim)
          }}> <DeleteOutlined /></button>
          <NavLink title='Tạo lịch chiếu' to={`/admin/films/showtime/${item.maPhim}`} className={'text-warning'}><CalendarOutlined /></NavLink>
        </div>
      }

    })
    return <Table style={{ minHeight: 300 }} columns={columns} dataSource={data} onChange={onChange} scroll={{
      x: 800,
    }} />
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <h3>Quản lý phim</h3>
      <NavLink className={'btn btn-success my-5'} to={'/admin/films/addnew'}>Thêm phim</NavLink>
      {renderData()}
    </div>
  )
}
