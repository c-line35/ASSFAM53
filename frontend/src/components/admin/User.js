import React, { useState, useEffect } from 'react';

const User = ({ user }) => {
    const { firstName, lastName, email, phoneNumber, role } = user;
    
    const [ isAdmin, setIsAdmin]=useState(false)
    const getRole = ()=>{
        role === 'admin'
        ?setIsAdmin(true)
        :setIsAdmin(false)
      }
     useEffect(()=>{
      getRole()
     })
    return (
        <>

<div className="userTable">
    <div className='userTable__element'>
      <span className="userTable__element__name">{lastName.toUpperCase()} {firstName}</span>
      {isAdmin&& <img src='./assets/icones/admin.png' alt='admin' className='userTable__element__admin'/>}
    </div>
      <a href ='mailto:bussonceline@sfr.fr' className='userTable__element'>{email}</a>
      <a href={`'tel:+33'+${phoneNumber}`}  className='userTable__element'>0{phoneNumber}</a>
    </div>
         {/* <div className='userCard__info'> <p>NOM, Prénom:</p> {(lastName.toUpperCase())} {firstName}</div>
            <div className='userCard__info'><p>email:</p> {email}</div>
            <div className='userCard__info'><p>Téléphone:</p> 0{phoneNumber}</div>
            <div className='userCard__info'><p>Rôle: </p>{role}</div>
            <div className='userCard__info'><p>Niveau d'adhésion:</p> {level}</div>
            <div className='userCard__info'><p>Date de fin d'adhésion: </p>{end}</div> 
       */}
       </> 
    );
};

export default User;