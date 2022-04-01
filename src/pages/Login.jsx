import React, { useEffect } from "react";
import { Button, Col, Form, Input, message, Row } from "antd";
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import '../resources/authentication.css'
function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const onFinish = (values) => {
    dispatch({type:'showLoading'})
    axios.post('/api/users/login',values).then((res)=>{
      dispatch({type:'hideLoading'})
      message.success('Login successful')
      localStorage.setItem('pos-user',JSON.stringify(res.data))
      navigate('/home')
    }).catch((error)=>{
      message.error(error)
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
                <h3>Login</h3>
        <Form.Item name="userId" label="User ID">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type='password'/>
        </Form.Item>
        <div className="d-flex justify-content-end align-items-center">
            <Link to='/register'>Not yet Registered ? Click Here To Register!</Link>
          <Button htmlType="submit" type="primary">
            Login
          </Button>
        </div>
      </Form>
            </Col>
        </Row>
    </div>
  );
}

export default Login;
