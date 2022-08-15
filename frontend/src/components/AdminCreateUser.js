import React, { useState } from 'react';
import { Form, Input, Radio, Button, Switch } from 'antd';
import axios from 'axios'

const AdminCreateUser = () => {
    const [insurance, setInsurance] = useState(false)
    const onFinish = (values)=>{
        const { email, firstName, lastName, form, level, password, role, phoneNumber} = values
        axios.post(
            "http://localhost:3001/api/auth/signup",
            {
                email,
                firstName,
                lastName,
                form,
                level, 
                password,
                role,
                phoneNumber,
                end:'2022-12-31'    
            }
        )
        .then(()=>{alert('Utilisateur créé')})
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const isInsurance = (e) =>{
            parseInt(e.target.value) === 3
            ? setInsurance(true)
            :setInsurance(false)
      }

    return (
        <div className='createUser'>
       <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
             <Form.Item
                label="Nom"
                name="lastName"
                rules={[
                {
                    required: true,
                    message: 'Veuillez entrer votre nom!',
                },
                ]}
            >
                <Input />
            </Form.Item>
             <Form.Item
                label="prénom"
                name="firstName"
                rules={[
                {
                    required: true,
                    message: 'Veuillez entrer votre prénom!',
                },
                ]}
            >
                <Input />
            </Form.Item>
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
                name="phoneNumber"
                label="Téléphone"
                rules={[
                {
                    required: true,
                    message: 'Veuillez entrer un numéro de téléhone',
                },
                ]}
            >
                <Input
                style={{
                    width: '100%',
                }}
                />
            </Form.Item>
             <Form.Item
                label="Mot de passe"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Veuillez entrer un mot de passe!',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item name="role" label="Rôle">
                <Radio.Group>
                    <Radio value="user">Adhérent</Radio>
                    <Radio value="admin">Administrateur</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item name="level" label="Niveau d'adhésion" onChange={isInsurance}>
                <Radio.Group >
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </Radio.Group>
            </Form.Item>    
            {insurance && 
            <Form.Item name="form" label="Formulaire assurance" valuePropName="checked">
                <Switch />
            </Form.Item>
            }
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Envoyer
                </Button>
            </Form.Item>

        </Form>
        </div>

    );
};

export default AdminCreateUser;