import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { authContext } from '../context/AuthContext';
import { staffContext } from '../context/StaffContext';


const Navigation = () => {

  const { initToken,  setIsAdminUser, setIsAdminAdmin, setIsAdminStaff, isAuthenticate, setIsAuthentiacte} = useContext(authContext)
  const { authProfil, setConnect } = useContext(authContext)
  const { getAllStaff }=useContext(staffContext);
  

  const { role }= authProfil;
  const [ isAdmin, setIsAdmin]=useState(false);
  const [showNav, setShowNav]=useState(false)

  
  const disconnect = () =>{
    localStorage.removeItem('token')
    setIsAuthentiacte(false)
    initToken()
    setIsAdminUser(false)
    setIsAdminAdmin(false)
    setIsAdminStaff(false)
    setConnect(false)
    setShowNav(false)

}
const getConnect=()=>{
    setConnect(true)
    setShowNav(false)
}

  const getRole = ()=>{
    role === 'admin'
    ?setIsAdmin(true)
    :setIsAdmin(false)
  }

  const getStaff=()=>{
    setShowNav(false)
    getAllStaff();
  }
 useEffect(()=>{
  getRole()
 })

  return (
    <>
    <div className="navigation">
      <div className='navigation navigation--pages'>
      <NavLink to="/home">
        <img src='assets/icones/home.png' alt='accueil' />
      </NavLink>
      <NavLink to="/join" className={(nav)=>(nav.isActive? 'nav-active':"")}>
        <div>Adhérer</div>
      </NavLink>
      <NavLink to="/staff" onClick={()=>{getAllStaff()}}className={(nav)=>(nav.isActive? 'nav-active':"" )}>
        <div >Le Bureau</div>
      </NavLink>
      <NavLink to="/partners" className={(nav)=>(nav.isActive? 'nav-active':"")}>
        <div >Partenaires</div>
      </NavLink>
      {isAuthenticate
    ?<NavLink to="/library" className={(nav)=>(nav.isActive? 'nav-active':"")}>
    <div >Bibliothèque</div>
  </NavLink>
    :''
      }

    </div>
    {isAuthenticate
    ?<div className='navigation navigation--connect'>   
        {isAdmin &&
        <NavLink to="/management">
          <img src='assets/icones/dashboard.png' alt="administration"/>
        </NavLink>
        }
        <NavLink to="/profil"><img src="assets/icones/profil.png" alt="profil"/></NavLink>
        <NavLink to="/" onClick={disconnect}>Déconnexion</NavLink>
    </div>
    : 
    <NavLink to="/" onClick={getConnect}>Connexion</NavLink>
    }
    </div>
    {/* --------------------------RESPONSIVE------------------------------------------ */}
    <div className="navigationRes">
      <div className='navigationRes__icones'>
        <img src='assets/icones/menu.png' alt="menu" onClick={()=>{setShowNav(showNav?false:true)}}/>
        {isAuthenticate
        ? <NavLink to="/" onClick={disconnect}>Déconnexion</NavLink>
        :  <NavLink to="/" onClick={getConnect}>Connexion</NavLink>
        }
      </div>
      {showNav&&
      <>
      <div className='navigationRes navigationRes--pages'>
          <NavLink to="/home" onClick={()=>{showNav(false)}}>
          Accueil
          </NavLink>
          <NavLink to="/join" onClick={()=>{showNav(false)}}>
            <div>Adhérer</div>
          </NavLink>
          <NavLink to="/staff" onClick={getStaff}>
            <div >Le Bureau</div>
          </NavLink>
          <NavLink to="/partners" onClick={()=>{showNav(false)}}>
            <div >Partenaires</div>
          </NavLink>
        </div>
        {isAuthenticate&&
        <div className='navigationRes navigationRes--connect'>   
            {isAdmin &&
            <NavLink to="/management" onClick={()=>{showNav(false)}}> Administration </NavLink>
            }
            <NavLink to="/profil" onClick={()=>{showNav(false)}}>Profil</NavLink>
          </div>
        }</>
        }
    </div>
    </>
      )
}

export default Navigation
