import React,{useEffect, useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import {useDispatch} from 'react-redux'
import { DeleteOutlined,EditOutlined} from '@ant-design/icons'
import axios from 'axios'
import {Table,Button,Modal,Form,Input,Select, message} from 'antd'

function Items() {
  const [itemsData,setItemsData]=useState([])
  const [addEditModalVisibility,setaddEditModalVisibility]=useState(false)
  const [editingItem,seteditingItem]=useState(null)

  const dispatch=useDispatch()
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
      title:'Category',
      dataIndex:'category'
    }, 
    {
      title:'Actions',
      dataIndex:'_id',
      render:(id,record)=><div className='d-flex'>
         <EditOutlined className='mx-2' 
              onClick={()=>{
                seteditingItem(record) 
                setaddEditModalVisibility(true)
                }}/>
        <DeleteOutlined className='mx-2' onClick={()=>deleteItem(record)}/>
      </div>
    }
  ]
  const getAllItems=()=>{
    dispatch({type:'showLoading'})
    axios.get('/api/items/get-all-items').then((response)=>{
      dispatch({type:'hideLoading'})
      setItemsData(response.data)
    }).catch(err=>{
      dispatch({type:'hideLoading'})
      console.log(err)
    })
  }
const deleteItem=(record)=>{
  dispatch({type:'showLoading'})
  axios.post('/api/items/delete-item',{itemId:record._id})
  .then((response)=>{
    dispatch({type:'hideLoading'})
    message.success('Item deleted successfully')
    getAllItems()
  }).catch((error)=>{
    dispatch({type:'hideLoading'})
    message.error('Something went wrong')
  })
}
  useEffect(()=>{
    getAllItems()
  },[])

  const onFinish=(values)=>{
    dispatch({type:'showLoading'})
   if(editingItem===null){
    axios.post('/api/items/add-item',values)
    .then((response)=>{
      dispatch({type:'hideLoading'})
      message.success('Item added successfully')
      setaddEditModalVisibility(false)
      getAllItems()
    }).catch((err)=>{
      message.error('Something went wrong!')
      console.log(err)
    })
   }
   else{
    axios.post('/api/items/edit-item',{...values,itemId:editingItem._id})
    .then((response)=>{
      dispatch({type:'hideLoading'})
      message.success('Item editing successfully')
      seteditingItem(null)
      setaddEditModalVisibility(false)
      getAllItems()
    }).catch((err)=>{
      message.error('Something went wrong!')
      console.log(err)
    })
   }
  }
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
      <h3>Items</h3>
      <Button type='primary' onClick={()=>{setaddEditModalVisibility(true)}}>Add Item</Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered/>
        {addEditModalVisibility && (
             <Modal onCancel={()=>{
              setaddEditModalVisibility(false)
              seteditingItem(null)
             }} visible={addEditModalVisibility} title={editingItem?'Edit Item':'Add new item'} footer={false}>
             <Form initialValues={editingItem} layout='vertical' onFinish={onFinish}>
                 <Form.Item name='name' label='Name'>
                     <Input />
                 </Form.Item>
                 <Form.Item name='price' label='Price'>
                     <Input />
                 </Form.Item>
                 <Form.Item name='image' label='Image URL'>
                     <Input />
                 </Form.Item>
                 <Form.Item name='category' label='category'>
                   <Select>
                     <Select.Option value='fruits'>Fruits</Select.Option>
                     <Select.Option value='vegetables'>Vegetables</Select.Option>
                     <Select.Option value='meat'>Meat</Select.Option>
                   </Select>
                 </Form.Item>
                 <div className="d-flex justify-content-end">
                   <Button htmlType='submit' type='primary'>Save</Button>
                 </div>
             </Form>
           </Modal>
        )}
    </DefaultLayout>
  )
}

export default Items