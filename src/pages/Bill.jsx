import React,{useEffect, useRef, useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import {useDispatch} from 'react-redux'
import { EyeOutlined} from '@ant-design/icons'
import axios from 'axios'
import {Table,Button,Modal} from 'antd'
import {useReactToPrint} from 'react-to-print'

function Bills() {
  const componentRef=useRef()
  const [billsData,setBillsData]=useState([])
  const [printBillModalVisibility,setprintBillModalVisibility]=useState(false)
  const [selectedBill,setSelectedBill]=useState(null)

  const dispatch=useDispatch()
  const columns=[
    {
      title:'Id',
      dataIndex:'_id',
    },
    {
      title:'Customer',
      dataIndex:'customerName',
    },
    {
      title:'SubTotal',
      dataIndex:'subTotal'
    }, 
    {
      title:'Tax',
      dataIndex:'tax'
    }, 
    {
      title:'Total',
      dataIndex:'totalAmount'
    }, 
    {
      title:'Actions',
      dataIndex:'_id',
      render:(id,record)=><div className='d-flex'>
        <EyeOutlined onClick={()=>{
          setSelectedBill(record)
          setprintBillModalVisibility(true)
          }}/>
      </div>
    }
  ]
  const cartColumns=[
    {
      title:'Name',
      dataIndex:'name',
    },
    {
      title:'price',
      dataIndex:'price'
    },
    {
      title:'Quantity',
      dataIndex:'_id',
      render:(id,record)=><div>
        <b>{record.quantity}</b>
      </div>
    },
    {
      title:'Total',
      dataIndex:'_id',
      render:(id,record)=><div>
        <b>{record.quantity*record.price}</b>
      </div>
    }
  ]
  const getAllBills=()=>{
    dispatch({type:'showLoading'})
    axios.get('/api/bills/get-all-bills').then((response)=>{
      dispatch({type:'hideLoading'})
      const data=response.data
      data.reverse()
      setBillsData(data)
      
    }).catch(err=>{
      dispatch({type:'hideLoading'})
      console.log(err)
    })
  }

  const handlePrint=useReactToPrint({
    content:()=>componentRef.current
  })

  useEffect(()=>{
    getAllBills()
  },[])

  
  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={billsData} bordered/>
        {printBillModalVisibility && (
             <Modal onCancel={()=>{
              setprintBillModalVisibility(false)
             }} visible={printBillModalVisibility}  footer={false} title='Bill Details' width={800}>
               <div className='bill-model p-3' ref={componentRef}>
                 <div className="d-flex justify-content-between bill-header pb-2">
                    <div >
                      <h1><b>SB market</b></h1>
                    </div>
                      <div>
                        <p>Kathmandu</p>
                        <p>Budhanilkantha</p>
                        <p>123123218</p>
                      </div>
                 </div>
                 <div className="bill-customer-details mt-2">
                   <p><b>Name</b> : {selectedBill.customerName}</p>
                   <p><b>Phone Number</b> : {selectedBill.customerPhoneNumber}</p>
                   <p><b>Date</b> : {selectedBill.createdAt.toString().substring(0,10)}</p>
                 </div>
                 <Table dataSource={selectedBill.cartItems} columns={cartColumns} pagination={false}/>
                 <div className='dotted-border mt-2 mb-2 pb-2'>
                   <p><b>SUB TOTAL</b> : {selectedBill.subTotal}</p>
                   <p><b>TAX</b> : {selectedBill.tax}</p>
                 </div>
                 <div className='mt-2'>
                   <h2><b>GRAND TOTAL : {selectedBill.totalAmount}</b></h2>
                 </div>
                 <div className="dotted-border mt-2"></div>
                 <div className='text-center'>
                    <p>Thanks</p>
                    <p>Visit Again :)</p>
                 </div>
               </div>
               <div className="d-flex justify-content-end">
                 <Button type='primary' onClick={handlePrint}>Print Bill</Button>
               </div>
           </Modal>
        )}
    </DefaultLayout>
  )
}

export default Bills