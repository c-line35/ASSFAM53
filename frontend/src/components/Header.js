import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import {NavLink} from 'react-router-dom';
import Auth from '../components/Auth';

const Header = () => {

    const [isConnect, setIsConnect]=useState(false);

    return (
        <>
        {isConnect
        ?<Auth/>
        :<div className='header header--color'>
            <div className='header__head'>
               
                    <NavLink to ='/'className='header__head__nav'>
                        <img className='header__head__nav__logo'src='./assets/logos/logo.png' alt="logo de l'association"></img>
                    </NavLink>
                
                <div className='header__head__tilte header__title--color'>
                    <h1>Association des Familles d'Accueil de la Mayenne</h1>
                </div>
            </div>
            <Navigation isConnect={isConnect} setIsConnect={setIsConnect} />
        </div> }</>
    );
};

export default Header;