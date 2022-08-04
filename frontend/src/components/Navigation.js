import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
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
    </div>
  )
}

export default Navigation
