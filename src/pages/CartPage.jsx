import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
function CartPage() {
  const navigate=useNavigate()
  const {cartItems}=useSelector(state=>state.rootReducer)
  const [subTotal,setSubTotal]=useState(0)
  const [billchargeModal,setBillchargeModal]=useState(false)
  const dispatch=useDispatch()
  const increaseQuantity=(record)=>{
    dispatch({type:'updateCart',payload:{...record,quantity:record.quantity+1}})
  }

  const decreaseQuantity=(record)=>{
    console.log(record)
    if(record.quantity!==1){

      dispatch({type:'updateCart',payload:{...record,quantity:record.quantity+-1}})
    }
  }

  const columns=[
    {
      title:'Name',
      dataIndex:'name',
    },
    {
      title:'Image',
      dataIndex:'image',
      render:(image,record)=><img src={image} height='60' width='60'/>
    },
    {
      title:'price',
      dataIndex:'price'
    },
    {
      title:'Quantity',
      dataIndex:'_id',
      render:(id,record)=><div>
       <PlusCircleOutlined className='mx-3' onClick={()=>increaseQuantity(record)}/>
        <b>{record.quantity}</b>
        <MinusCircleOutlined className='mx-3' onClick={()=>decreaseQuantity(record)}/>
      </div>
    },
    {
      title:'Actions',
      dataIndex:'_id',
      render:(id,record)=><DeleteOutlined onClick={()=>dispatch({type:'deleteFromCart',payload:record})}/>
    }
  ]

  useEffect(()=>{
    let temp=0;
    cartItems.forEach((item)=>{
      temp=temp+(item.price*item.quantity)
    })
    setSubTotal(temp)
  },[cartItems])

  const onFinish=(values)=>{
    const reqObject={
      ...values,
      subTotal,
      cartItems,
      tax:Number(((subTotal/100)*10).toFixed(2)),
      totalAmount:Number(subTotal+Number(((subTotal/100)*10).toFixed(2))),
      userId:JSON.parse(localStorage.getItem('pos-user'))._id
    }
    // useDispatch({type:''})
    axios.post('/api/bills/charge-bill',reqObject).then(()=>{
      message.success('Bill charged successfully')
      setBillchargeModal(false)
      navigate('/bills')
    }).catch((err)=>{
      message.error('Something went wrong!')
    })
  }
  return (
    <DefaultLayout>
        <h3>Cart</h3>
        <Table columns={columns} dataSource={cartItems} bordered pagination={false}/>
        <hr />
        <div className="d-flex justify-content-end flex-column align-items-end">
          <div className="subtotal">
            <h3>SUB TOTAL:<b>{subTotal}$/-</b></h3>
          </div>
          <Button type='primary' onClick={()=>setBillchargeModal(true)}>CHARGE BILL</Button>
        </div>  
        <Modal title='Charge Bill' visible={billchargeModal} footer={false} onCancel={()=>setBillchargeModal(false)}>
        <Form  layout='vertical' onFinish={onFinish}>
                 <Form.Item name='customerName' label='Customer Name'>
                     <Input />
                 </Form.Item>
                 <Form.Item name='customerPhoneNumber' label='Phone Number'>
                     <Input />
                 </Form.Item>
                 <Form.Item name='paymentMode' label='Payment Mode'>
                   <Select>
                     <Select.Option value='cash'>Cash</Select.Option>
                     <Select.Option value='card'>Card</Select.Option>
                   </Select>
                 </Form.Item>
                 <div className="charge-bill-amount">
                   <h5>SubTotal: <b>{subTotal}</b></h5>
                   <h5>Tax: <b>{((subTotal/100)*10).toFixed(2)}</b></h5>
                   <hr />
                   <h2><b>Grand Total : </b>{subTotal+((subTotal/100)*10)}</h2>
                 </div>
                 <div className="d-flex justify-content-end">
                   <Button htmlType='submit' type='primary'>GENERATE BILL</Button>
                 </div>
             </Form>
        </Modal>    
    </DefaultLayout>
  )
}

export default CartPage