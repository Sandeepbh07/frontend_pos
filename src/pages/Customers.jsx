import React,{useEffect, useRef, useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import {Table} from 'antd'

function Bills() {
  const [customersData,setCustomersData]=useState([])

  const dispatch=useDispatch()

  const columns=[
    {
      title:'Customer',
      dataIndex:'customerName',
    },
    {
      title:'Phone Number',
      dataIndex:'customerPhoneNumber'
    }, 
    {
      title:'Created On',
      dataIndex:'createdAt',
      render:(value)=><span>{value.toString().substring(0,10)}</span>
    }
  ]
  
  const getAllBills=()=>{
    dispatch({type:'showLoading'})
    axios.get('/api/bills/get-all-bills').then((response)=>{
      dispatch({type:'hideLoading'})
      setCustomersData(response.data)
    }).catch(err=>{
      dispatch({type:'hideLoading'})
      console.log(err)
    })
  }

  useEffect(()=>{
    getAllBills()
  },[])

  
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Customers</h3>
      </div>
      <Table columns={columns} dataSource={customersData} bordered/>
    </DefaultLayout>
  )
}

export default Bills