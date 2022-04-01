import React,{useEffect} from "react";
import { Button, Col, Form, Input, message, Row } from "antd";
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router";
import '../resources/authentication.css'
function Register() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const onFinish = (values) => {
    dispatch({type:'showLoading'})
    axios.post('/api/users/register',values).then((res)=>{
      dispatch({type:'hideLoading'})
      message.success('Registration succesfull,please wait for verification')
    }).catch((error)=>{
      message.error('Something went wrong!')
    })
  };
  useEffect(()=>{
    if(localStorage.getItem('pos-user')){
      navigate('/home')
    }
  },[])
  return (
    <div className="authentication">
        <Row>
            <Col lg={10} xs={22}>
            <Form layout="vertical" onFinish={onFinish}>
                <h1><b>POS</b></h1>
                <hr />
                <h3>Register</h3>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="userId" label="User ID">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type='password'/>
        </Form.Item>
        <div className="d-flex justify-content-end align-items-center">
            <Link to='/login'>Already Registered ? Click Here To Login!</Link>
          <Button htmlType="submit" type="primary">
            Register
          </Button>
        </div>
      </Form>
            </Col>
        </Row>
    </div>
  );
}

export default Register;
