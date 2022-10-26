import React, { useState, useEffect } from 'react';

const User = ({ user }) => {
    const { firstName, lastName, email, phoneNumber, role, level } = user;
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
      <div className="userTable__element__name">{lastName.toUpperCase()} {firstName}</div>
      {isAdmin&& <img src='./assets/icones/admin.png' alt='admin' className='userTable__element__admin'/>}
    </div>
      <a href ='mailto:bussonceline@sfr.fr' className='userTable__element'>{email}</a>
      <a href={`'tel:+33'+${phoneNumber}`}  className='userTable__element'>0{phoneNumber}</a>
      <div className='userTable__element userTable__element--level'>{level}</div>
    </div>
       </> 
    );
};

export default User;