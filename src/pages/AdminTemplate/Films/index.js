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
      title: 'Ma phim',
      dataIndex: 'maPhim',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Age',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
  ];

  const renderData = () => {
    let data =  films?.map((item, index) => {
      return{
            key: index,
            maPhim: item.maPhim,
            tenPhim: item.tenPhim,
            hinhAnh: item.hinhAnh,
            moTa: item.moTa
          }
      
    })
    return <Table columns={columns} dataSource={data} onChange={onChange} />
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
