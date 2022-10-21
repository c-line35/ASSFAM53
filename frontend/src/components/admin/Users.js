import React, { useContext, useState } from 'react';
import User from './User';


import { usersContext } from '../../context/UsersContext';





const Users = () => {
 
  const { users, setUsers, setShowUsers } = useContext(usersContext);

  const [filteredArr, setfilteredArr]=useState(users)
const onClick=()=>{
  setShowUsers(false)
}

const onChange =(e)=>{
const search = e.target.value.toLowerCase()
const filter=users.filter(el=>el.lastName.toLowerCase().includes(search))
setfilteredArr(filter)
console.log(filteredArr)
}

    return (
      <div className='mainContentUsers'>
        <div className='input-control'>
          <img src='./assets/icones/zoom.png' alt='recherche'/>
          <input  placeholder='Rechercher' onChange={onChange} ></input>
        </div>
        <button onClick={onClick}>revenir au tableau de bord</button> 
    
    <section className='users'>
      <div className=" userTableTitle">
        <span >Nom, Prénom</span>
        <span >Email</span>
        <span >Téléphone</span>
      </div>
           {filteredArr
           .sort((a,b)=>a.lastName.toLowerCase()>b.lastName.toLowerCase()? 1:-1)
           .map((user)=>(<User key={user.id} user={user}/>))}
      </section> 
             
        </div>
    );
};

export default Users;