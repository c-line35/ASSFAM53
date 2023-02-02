import React, { useContext, useState } from 'react';
import { Button, Cascader, Form, Input }from 'antd';
import { authContext } from '../../context/AuthContext';
import { usersContext } from '../../context/UsersContext';


const txtRegexp = new RegExp(/^[a-z0-9\séèçêëàù'\-,.":{}!?;]{1,2000}$/i);
const nameRegexp = new RegExp(/^[a-z\séèçêëàù'-]{1,2000}$/i);

const UpdateUser = ({ 
    user, setUser, 
    setGetLastName, getLastName, 
    setGetFirstName, getFirstName, 
    setGetEmail, getEmail, 
    setGetPhone, getPhone, 
    setGetLevel, getLevel, 
    setGetAdress, getAdress,
    setGetPost, getPost,
    setGetCity, getCity,
    setMessageError, messageError
        }) => {
            
    const { lastName, firstName, email, phoneNumber, level, _id, adress, post, city} = user;
    const { setIsEdit  }=useContext(usersContext);
    const { reqBearer }= useContext(authContext);
            
    const [updateError, setUpdateError]=useState();

  

    const updateLastName=(e)=>{
        setGetLastName(e.target.value)
    }

    const updateFirstName=(e)=>{
        setGetFirstName(e.target.value)
    }

    const updateEmail=(e)=>{
        setGetEmail(e.target.value)
    }
    const updatePhone=(e)=>{
        setGetPhone(e.target.value)
    }

    const updateLevel=(value)=>{
        setGetLevel(value)
    }

    const updateAdress=(e)=>{
        setGetAdress(e.target.value)
    }

    const updatePost=(e)=>{
        setGetPost(e.target.value)
    }

    const updateCity=(e)=>{
        setGetCity(e.target.value)
    }
   
    const onFinish=(values)=>{
        reqBearer.put(
            `auth/user/update/${_id}`,
            {
                lastName: getLastName?getLastName.toUpperCase():lastName.toUpperCase,
                firstName: getFirstName? getFirstName: firstName,
                email: getEmail? getEmail:email,
                phoneNumber: getPhone? getPhone:phoneNumber,
                adress:getAdress?getAdress:adress,
                post:getPost?getPost:post,
                city: getCity? getCity: city,
                level: getLevel? getLevel[0]:level
            }
        )
        .then(()=>{
            reqBearer.get(`/auth/idUser/${_id}`)
                .then((res)=>setUser(res.data))
    
            alert(`Le profil de ${getFirstName} ${getLastName.toUpperCase()} a bien été modifié`)
            setIsEdit(false)
            setGetLastName("")
            setGetFirstName("")
            setGetEmail("")
            setGetPhone("")
            setGetLevel("")
            setGetAdress("")
            setGetPost("")
            setGetCity("")
        }) 
        .catch((error)=>{
              setMessageError(error.response.data.message);
              setUpdateError('Une erreur est survenue')
          })
        
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
              <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                   <Form.Item
                   label="Nom de famille"
                    initialValue={lastName.toUpperCase()}
                    name="lastName"                         
                    onChange ={updateLastName}
                    rules={[
                    {
                    pattern: nameRegexp,
                    message:"Format invalide"
                    }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                   <Form.Item
                    initialValue={firstName}
                    label="Prénom"
                        name="firstName"                         
                        onChange ={updateFirstName}
                    rules={[
                      {
                    pattern: nameRegexp,
                    message:"Format invalide"
                }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                   <Form.Item
                        label="email"
                        name="email"
                        initialValue={email}                        
                        onChange ={updateEmail}
                    rules={[
                    {
                        type: "email", 
                        message: 'adresse email non valide'
                    },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                   <Form.Item
                   label="Téléphone"
                    initialValue={0 +`${phoneNumber}`}
                        name="phoneNumber"                         
                        onChange ={updatePhone}
                    rules={[
                    {
                        pattern: txtRegexp,
                        message:"Format invalide"
                    }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                    label="Adresse"
                    initialValue={adress}
                        name="adress"                         
                        onChange ={updateAdress}
                            rules={[
                    {
                        pattern:txtRegexp,
                        message:"Format invalide"
                    }
                    ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                   label="Code postal"
                    initialValue={post}
                        name="post"                         
                        onChange ={updatePost}
                        rules={[
                    {
                        pattern:txtRegexp,
                        message:"Format invalide"
                    }
                    ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Ville"
                        initialValue={city}                      
                        name="city"                         
                        onChange ={updateCity}
                         rules={[
                    {
                        pattern: nameRegexp,
                        message:"Format invalide"
                    }
                    ]}
                    >
                        <Input/>
                    </Form.Item>
                   <Form.Item
                   label="Niveau d'adhésion"
                    initialValue={level}
                        name="level"          
                    >
                        <Cascader onChange ={updateLevel}     
                        options={[
                            {value:1, 
                            label:"1"},
                            {value:2, 
                            label:"2"},
                            {value:3, 
                            label:"3"}
                        ]}/>
                    </Form.Item>
                   
                    <Button htmlType='submit'>Valider</Button>
                </Form>  
                {messageError&&<div className="message-error">{messageError}</div>}
                {updateError&&<div className="message-error">{updateError}</div>}
        </div>
    );
};

export default UpdateUser;