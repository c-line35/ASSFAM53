import React, { useContext, useState } from 'react';
import { Form, Input, Radio, Button } from 'antd';
import { authContext } from '../../context/AuthContext';
import { usersContext } from '../../context/UsersContext';

const date = new Date()
const year = date.getFullYear();

const txtRegexp = new RegExp(/^[a-z0-9\séèçêëàù'\-,.":{}!?;]{1,2000}$/i);
const nameRegexp = new RegExp(/^[a-z\séèçêëàù'-]{1,2000}$/i);
const validePassword = new RegExp (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/)

const AdminCreateUser = ({ setIsModalVisible }) => {

    const { reqInstance } = useContext(authContext)
    const { getAllUsers }=useContext(usersContext)

    const [value, setValue] = useState(1);
    const [messageError, setMessageError]=useState()

    const onChange = (e) => {
      setValue(e.target.value);
    }

    const onFinish = (values)=>{
        const { email, firstName, level, password, phoneNumber, end, adress, post, city } = values;
        const lastName = values.lastName.toUpperCase();
        reqInstance.post(
            "/auth/signup",
            {
                email,
                firstName,
                lastName,
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
        .catch((err)=>setMessageError('Une erreur est survenue'))
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
                    message: 'Veuillez entrer un nom',
                },
                {
                    pattern: nameRegexp,
                    message:"Format invalide"
                }
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
                    message: 'Veuillez entrer un prénom',
                },
                {
                    pattern: nameRegexp,
                    message:"Format invalide"
                }
                ]}
            >
                <Input />
            </Form.Item>
             <Form.Item
                label="email"
                name="email"
                rules={[
                {type: "email", 
                    message: 'adresse email non valide'
                   
                },
                {
                    required: true,
                    message: 'Veuillez entrer un email',
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
                {
                    pattern: txtRegexp,
                    message:"Format invalide"
                }
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
                rules={[
                    {
                        pattern:txtRegexp,
                        message:"Format invalide"
                    }
                    ]}
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
                rules={[
                    {
                        pattern: txtRegexp,
                        message:"Format invalide"
                    }
                    ]}
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
                rules={[
                    {
                        pattern: nameRegexp,
                        message:"Format invalide"
                    }
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
                      message: 'Veuillez rentrer un mot de passe',
                    },
                    {
                      pattern: validePassword,
                      message:`Votre mot de passe doit contenir entre 
                      8 à 15 caractères__
                      au moins une lettre minuscule__
                      au moins une lettre majuscule__
                      au moins un chiffre__
                      au moins un de ces caractères spéciaux: $ @ % * + - _ !`
                    }
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
            {messageError&& <div className='message-error'>{messageError}</div>}
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