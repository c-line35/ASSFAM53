import React from 'react';
import Navigation from '../components/Navigation';
import {NavLink} from 'react-router-dom';


const Header = () => {
    return (
        <div className='header header--color'>
            <div className='header__nav'>
                <NavLink to ='/'>
                    <img src='./assets/logos/logo.png' alt="logo de l'association"></img>
                </NavLink> 
                < Navigation />
            </div>
            <div className='header__tilte header__title--color'>
                <h1>Association des Familles d'Accueil de la Mayenne</h1>
            </div>
            
        </div>
    );
};

export default Header;