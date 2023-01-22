import React, { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import { Button, Form, Input } from 'antd';
import ResetPassword from './ResetPassword';
import Home from '../pages/Home'

const Auth = () => {
    
    const { reqInstance, getProfil, token } = useContext(authContext)
 
    const onFinish = (values)=>{
       reqInstance.post(
            '/auth/login',
            {email: values.email,
            password: values.password
        })
        .then((res)=>{
          localStorage.setItem('token', res.data.token);
          getProfil()
        })
        .catch((error)=>alert(error))
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    

    return (
      <>
      {token
      ?<Home />
   
       : <div className='authForm'>
          <div className='authForm__form'>
            <NavLink to ='/'className='header__nav__logo'>
                    <img src='./assets/logos/logo.png' alt="logo de l'association"></img>
            </NavLink> 
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
          Connexion
        </Button>
      </Form.Item>
    </Form>
    <ResetPassword/>
    </div>
        </div>
        } 
  </>
    );
};

export default Auth;