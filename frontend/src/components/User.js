import React from 'react';

const User = ({ user }) => {
    const { firstName, lastName, email, role, end, phoneNumber, level} = user

    return (
        <div className='userCard'>
            <div className='userCard__info'> <p>NOM, Prénom:</p> {(lastName.toUpperCase())} {firstName}</div>
            <div className='userCard__info'><p>email:</p> {email}</div>
            <div className='userCard__info'><p>Téléphone:</p> 0{phoneNumber}</div>
            <div className='userCard__info'><p>Rôle: </p>{role}</div>
            <div className='userCard__info'><p>Niveau d'adhésion:</p> {level}</div>
            <div className='userCard__info'><p>Date de fin d'adhésion: </p>{end}</div>
        </div>
    );
};

export default User;