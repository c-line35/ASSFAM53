import React, { useContext, useEffect, useState } from 'react';
import { usersContext } from '../../context/UsersContext';

import AdminCheckRights from './AdminCheckRights';


const AdminRights = () => {

    const { users, setAfficheDashboard, setAfficheAdmins } = useContext(usersContext)
  
    const [listOfAdmins, setListOfAdmins]=useState(['']);
    

const getListOfAdmins =()=>{
    const newArray = users.filter((el)=>el.role.includes("admin"))
    setListOfAdmins(newArray)
}
useEffect(()=>{
    getListOfAdmins()
},[])

const back=()=>{
    setAfficheDashboard(true)
    setAfficheAdmins(false)
   }
    return (
        <div>
           <h2>Droits des administrateurs</h2>
           <div className='backDashboard' onClick={back}>
          <img src="../assets/icones/dashboard.png" alt='tableau de bord'/>
          Retour
        </div> 
           {listOfAdmins
                .sort((a,b)=>a.lastName.toLowerCase()>b.lastName.toLowerCase()? 1:-1)
                .map((user)=><AdminCheckRights key={user.id} user={user}/>)}
        </div>
    );
};

export default AdminRights;