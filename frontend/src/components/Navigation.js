import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { authContext } from '../context/AuthContext';


const Navigation = () => {

  const { authProfil } = useContext(authContext)
  const { role }= authProfil;
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
    <div className="navigation">
      <NavLink to="/home" className={(nav)=>(nav.isActive? 'nav-active':"")}>
        <div>Accueil</div>
      </NavLink>
      <NavLink to="/join" className={(nav)=>(nav.isActive? 'nav-active':"")}>
        <div>Adhérer</div>
      </NavLink>
      <NavLink to="/staff" className={(nav)=>(nav.isActive? 'nav-active':"")}>
        <div >Le Bureau</div>
      </NavLink>
      <NavLink to="/partners" className={(nav)=>(nav.isActive? 'nav-active':"")}>
        <div >Partenaires</div>
      </NavLink>
      {
      isAdmin &&
      <NavLink to="/admin" className={(nav)=>(nav.isActive? 'nav-active':"")}>
      <div >Administration</div>
    </NavLink>
      }
    </div>
  )
}

export default Navigation
