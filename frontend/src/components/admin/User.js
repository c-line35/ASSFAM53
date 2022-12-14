import React, { useState, useContext} from 'react';
import { Modal, Button, } from 'antd';
import UpdateUser from './UpdateUser';
import { usersContext } from '../../context/UsersContext';
import { authContext } from '../../context/AuthContext';

const User = ({ user,  isModalVisible, setIsModalVisible, setUser }) => {
  const { firstName, lastName, email, phoneNumber, level, adress, post, city } = user;
  const { isEdit, setIsEdit }= useContext(usersContext)
 const  { isAdminUser }=useContext(authContext)
 
  
  const [getLastName, setGetLastName] = useState();
  const [getFirstName, setGetFirstName] = useState();
  const [getEmail, setGetEmail] = useState();
  const [getPhone, setGetPhone] = useState();
  const [getLevel, setGetLevel]=useState();
  const [getAdress, setGetAdress]= useState();
  const [getPost, setGetPost]=useState();
  const [getCity, setGetCity]=useState();
  const [messageError, setMessageError]=useState();
  
 
const getIsEdit=()=>{

  setGetLastName(lastName.toUpperCase())
  setGetFirstName(firstName)
  setGetEmail(email)
  setGetPhone(phoneNumber)
  setGetLevel(level) 
  setGetAdress(adress)
  setGetPost(post)
  setGetCity(city)
  isEdit?setIsEdit(false):setIsEdit(true);
}

    const handleCancelCreate = () => {
      setGetLastName("")
      setGetFirstName("")
      setGetEmail("")
      setGetPhone("")
      setGetLevel("")
      setGetAdress("")
      setGetPost("")
      setGetCity("")
      setIsEdit(false)
      setIsModalVisible(false);
      setMessageError("")
      
  };
  const getLastYear=(user)=>{
    return Math.max.apply(null, user.end)
   }
   
    return (
      <>
    <Modal
               title= "Profil"
               visible={isModalVisible} 
               destroyOnClose={true}
               onCancel={handleCancelCreate}
                footer={[
                    <Button key="back" onClick={handleCancelCreate}>
                        Fermer
                    </Button>,
                    ]}
                >

{isEdit
?<>
<UpdateUser user={user} setUser={setUser}
            getLastName={getLastName} setGetLastName={setGetLastName}
            getFirstName={getFirstName} setGetFirstName={setGetFirstName}
            getEmail={getEmail} setGetEmail={setGetEmail}
            getPhone={getPhone} setGetPhone={setGetPhone}
            getLevel={getLevel} setGetLevel={setGetLevel}
            getAdress={getAdress} setGetAdress={setGetAdress}
            getPost={getPost} setGetPost={setGetPost}
            getCity={getCity} setGetCity={setGetCity}
            messageError={messageError} setMessageError={setMessageError}
          
/>

</>
:
<><div className='profil'>
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
  <div className='profil__element profil__element--level'>
    <span className='profil__element__title'>Niveau d'adhésion: </span>
    <span className='profil__element__text'>{level}</span>
  </div>
  <div className='profil__element profil__element--end'>
    <span className='profil__element__title'>fin d'adhésion: </span>
    <span className='profil__element__text'>{getLastYear(user)}</span>
  </div>

</div>
{isAdminUser&& <Button onClick={getIsEdit}>Modifier</Button>}
                 
                
                </>}
                </Modal >
       </> 
    );
};

export default User;