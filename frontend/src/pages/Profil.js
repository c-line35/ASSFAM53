import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { authContext } from '../context/AuthContext';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Button, Form, Input } from 'antd';

const txtRegexp = new RegExp(/^[a-z0-9\séèçêëàù'\-,.":{}!?;]{1,2000}$/i);
const nameRegexp = new RegExp(/^[a-z\séèçêëàù'-]{1,2000}$/i);

const Profil = () => {

const { reqBearer, authProfil, getProfil, initToken }= useContext(authContext);
const { firstName, lastName, email, phoneNumber, adress, post, city, _id, level } = authProfil;

const [editProfil, setEditProfil]=useState(false)
const [getLastName, setGetLastName] = useState();
const [getFirstName, setGetFirstName] = useState();
const [getEmail, setGetEmail] = useState();
const [getPhone, setGetPhone] = useState();
const [getAdress, setGetAdress]= useState();
const [getPost, setGetPost]=useState();
const [getCity, setGetCity]=useState();
const [messageError, setMessageError]=useState();

const lastYear=Math.max.apply(null, authProfil.end)

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

const updateAdress=(e)=>{
    setGetAdress(e.target.value)
}

const updatePost=(e)=>{
    setGetPost(e.target.value)
}

const updateCity=(e)=>{
    setGetCity(e.target.value)
}
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const onFinish=()=>{
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
        level:level
    }
)
.then(()=>{
    reqBearer.get(`/auth/idUser/${_id}`)
        .then((res)=>{
    alert(`Votre profil a bien été modifié`)
    setGetLastName("")
    setGetFirstName("")
    setGetEmail("")
    setGetPhone("")
    setGetAdress("")
    setGetPost("")
    setGetCity("")
    setEditProfil(false)
    getProfil() })
}) 
.catch((error)=>{
    if(error.response){
      setMessageError(error.response.data.message)
    }
  })
}

const getIsEdit=()=>{
    setGetLastName(lastName.toUpperCase())
    setGetFirstName(firstName)
    setGetEmail(email)
    setGetPhone(phoneNumber)
    setGetAdress(adress)
    setGetPost(post)
    setGetCity(city)
    setEditProfil(true)
  }

const cancel=()=>{
    setEditProfil(false)
    setGetLastName("")
      setGetFirstName("")
      setGetEmail("")
      setGetPhone("")
      setGetAdress("")
      setGetPost("")
      setGetCity("")
      setMessageError("")
}

const deleteProfil=()=>{
    if(window.confirm(
        "Si vous supprimez votre profil, vous n'aurez plus accès aux informations. Souhaitez vous supprimer votre profil? "))
        {
            reqBearer.delete(`auth/${_id}`)
              .then(()=>{
                localStorage.removeItem('token')
                initToken()
              })
              .catch((error)=>{
               setMessageError(error)
              })
        }
}
    return (
        <>
            <Header/>
            <div className="update-profil-title">
                <h2>Mon profil</h2><br/>
            </div>
            {authProfil&&<>
                <div>Mon adhésion se termine le 31 Décembre {lastYear}.</div>

            {editProfil
            ?
            <div className='update-profil-edit'>
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
                        pattern: txtRegexp,
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
                        pattern: txtRegexp,
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
                        pattern:txtRegexp,
                        message:"Format invalide"
                    }
                    ]}
            >
                <Input/>
            </Form.Item>   
            {messageError&&<div className='message-error'>{messageError}</div>} 
            <div className="update-profil-btn">       
                <Button type='primary' htmlType='submit'>Valider</Button>
                <Button onClick={cancel} >Annuler</Button>
            </div>
        </Form>  </div>
           
        :<div className="update-profil">
            <div className='profil'>
  <div className='profil__element profil__element--lastName'>
    <span className='profil__element__title'>NOM: </span>
    <span className='profil__element__text'>{lastName.toUpperCase()}</span>
  </div>
  <div className='profil__element profil__element--firstName'>
    <span className='profil__element__title'>Prénom: </span>
    <span className='profil__element__text'>{firstName}</span>
  </div>
  <div className='profil__element profil__element--email'>
    <span className='profil__element__title'>email: </span>
    <span className='profil__element__text'>{email}</span>
  </div>
  <div className='profil__element profil__element--phone'>
    <span className='profil__element__title'>Téléphone: </span>
    <span className='profil__element__text'>0{phoneNumber}</span>
  </div>
  <div className='profil__element profil__element--adress'>
    <span className='profil__element__title'>Adresse: </span>
    <span className='profil__element__text'>{adress}</span>
  </div>
  <div className='profil__element profil__element--post'>
    <span className='profil__element__title'>Code postal: </span>
    <span className='profil__element__text'>{post}</span>
  </div>
  <div className='profil__element profil__element--city'>
    <span className='profil__element__title'>Ville: </span>
    <span className='profil__element__text'>{city}</span>
  </div>
  <div className='update-profil-btn'>
    <Button onClick={getIsEdit}>Modifier</Button>
    <Button type="primary" danger onClick={deleteProfil}>Supprimer mon profil</Button>
  </div>
  </div>
</div> }</>}
            <Footer/>
        </>
    );
};

export default Profil;