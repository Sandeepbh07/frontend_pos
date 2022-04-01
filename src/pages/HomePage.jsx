import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import Item from '../components/Item'
import { Col, Row } from 'antd'
import { useDispatch } from 'react-redux'
import '../resources/items.css'
function HomePage() {
  const [itemsData,setItemsData]=useState([])
  const [selectedCategory,setSelectedCategory]=useState('fruits')
  const categories=[
    {
      name:'fruits',
      imageURL:'https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
      name:'vegetables',
      imageURL:'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
      name:'meat',
      imageURL:'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    }
  ]

  const dispatch=useDispatch()
  const getAllItems=()=>{
    dispatch({type:'showLoading'})
    axios.get('/api/items/get-all-items').then((response)=>{
      dispatch({type:'hideLoading'})
     setItemsData(response.data);
    }).catch(err=>{
      dispatch({type:'hideLoading'})
      console.log(err)
    })
  }

  useEffect(()=>{
    getAllItems()
  },[])
  return (
   <DefaultLayout>
     <div className="d-flex categories">
       {categories.map((category)=>{
         return <div onClick={()=>setSelectedCategory(category.name)} className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
                <h4>{category.name}</h4>
                <img src={category.imageURL} height='60' width='80'/>
         </div>
       })}
     </div>
     <Row gutter={20}>
     {itemsData.filter(i=>i.category===selectedCategory).map((item)=>{
       return <Col xs={24} lg={6} md={12} sm={6}>
         <Item item={item}/>
       </Col>
     })}
     </Row>
   </DefaultLayout>
  )
}

export default HomePage