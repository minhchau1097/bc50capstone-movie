import React, { useEffect } from 'react'
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchLichChieu } from 'pages/HomeTemplate/HomePage/LichChieu/duck/actions';
export default function ListMovie() {
  const dispatch = useDispatch()
  const films = useSelector((state) => state.lichChieuReducer.data)
  useEffect(() => {
    dispatch(actFetchLichChieu())
  }, [])
  
  
  const columns = [
    {
      title: 'Mã phim',
      dataIndex: 'maPhim',
      width: 100,
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
      sorter: (a, b) => a.tenPhim.length - b.tenPhim.length,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
       width: 100,
    
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
       width: 150,
    
    }
  ];

  const renderData = () => {
    let data =  films?.map((item, index) => {
      return{
            key: index,
            maPhim: item.maPhim,
            tenPhim: item.tenPhim,
            hinhAnh: <img width={120} height={100} src={item.hinhAnh} alt={item.tenPhim} />,
            moTa: item.moTa
          }
      
    })
    return <Table  columns={columns} dataSource={data} onChange={onChange}  scroll={{
      x: 1000,
    }}/>
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  
  return (
    <div>
      <h3>Quản lý phim</h3>
      <Button>Thêm phim</Button>
      {renderData()}
    </div>
  )
}
