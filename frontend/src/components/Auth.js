import React, { useContext, useState } from 'react';
import {NavLink} from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import { Button, Form, Input } from 'antd';
import ResetPassword from './ResetPassword';
import Home from '../pages/Home'
import Manage from '../pages/admin/Manage'
import { staffContext } from '../context/StaffContext';
const Auth = () => {
    
    const { reqInstance, getProfil, setConnect, authProfil, setIsAuthenticate, isAuthenticate } = useContext(authContext)
    const { getAllStaff }=useContext(staffContext)
    
    const [messageError, setMessageError]=useState('');
 
    const onFinish = (values)=>{
       reqInstance.post(
            '/auth/login',
            {email: values.email,
            password: values.password
        })
        .then((res)=>{
          localStorage.setItem('token', res.data.token);
          getProfil();
          getAllStaff();
        })
        .catch(()=>setMessageError('Adresse e-mail ou mot de passe incorrect'))
    }

    const onFinishFailed = (errorInfo) => {
       console.log(errorInfo)
      };

    

    return (
      <>
      {isAuthenticate?
      <>
      {authProfil.role==="admin"
        ?<Manage/>
        : <Home/>
      }</>
    
     : <div className='authForm'>
          <div className='authForm__form'>
            <NavLink to ='/'className='header__nav__logo' onClick={()=>{setConnect(false)}}>
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
    {messageError&&
      <div className="message-error">{messageError}</div>
      }
    <ResetPassword/>
    </div>
        </div>   
      
    }</>
    );
};

export default Auth;