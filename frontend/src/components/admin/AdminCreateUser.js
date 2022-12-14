import React, { useContext, useState } from 'react';
import { Form, Input, Radio, Button } from 'antd';
import { authContext } from '../../context/AuthContext';
import { usersContext } from '../../context/UsersContext';

const date = new Date()
const year = date.getFullYear()

const AdminCreateUser = ({ setIsModalVisible }) => {

    const { reqInstance } = useContext(authContext)
    const { getAllUsers }=useContext(usersContext)

    const [value, setValue] = useState(1);

    const onChange = (e) => {
      setValue(e.target.value);
    }

    const onFinish = (values)=>{
        const { email, firstName, lastName, form, level, password, phoneNumber, end, adress, post, city } = values;
        
        reqInstance.post(
            "/auth/signup",
            {
                email,
                firstName,
                lastName,
                form,
                level, 
                password,
                role:'user',
                phoneNumber,
                end,
                adress,
                post, 
                city 
            }
        )
        .then(()=>{
            alert('Utilisateur créé')
            getAllUsers()
            setIsModalVisible(false)
        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      

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
                name="adress"
                label="Adresse"
            >
                <Input
                style={{
                    width: '100%',
                }}
                />
            </Form.Item>
            <Form.Item
                name="post"
                label="Code Postal"
            >
                <Input
                style={{
                    width: '100%',
                }}
                />
            </Form.Item>
            <Form.Item
                name="city"
                label="Ville"
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
                    message: 'Veuillez entrer un mot de passe!',
                    required: true
                },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item name="level" label="Niveau d'adhésion" >
                <Radio.Group >
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </Radio.Group>
            </Form.Item>  
            <Form.Item name="end" label="Année" >
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={year}>{year}</Radio>
                    <Radio value={year + 1}>{year+1}</Radio>
                </Radio.Group>
            </Form.Item>
        
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Créer
                </Button>
            </Form.Item>

        </Form>
        </div>

    );
};

export default AdminCreateUser;