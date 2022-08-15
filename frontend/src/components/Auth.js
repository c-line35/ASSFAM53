import React, { useContext } from 'react';
import { authContext } from '../context/AuthContext';
import { Button, Form, Input } from 'antd';
import axios from 'axios';


const Auth = () => {
    
    const { initToken } = useContext(authContext)
 
    const onFinish = (values)=>{
       axios.post(
            `http://localhost:3001/api/auth/login`,
            {email: values.email,
            password: values.password
        })
        .then((res)=>{
            localStorage.setItem('token', res.data.token)
            initToken()  
        })
        .catch((error)=>alert(error))
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div>
            <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
     
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Veuillez entrer votre adresse email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="mot de passe"
        name="password"
        rules={[
          {
            required: true,
            message: 'Veuillez rentrer votre mot de passe!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
        </div>
    );
};

export default Auth;