import React, { useContext, useState } from 'react';
import Navigation from '../components/Navigation';
import {NavLink} from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import Auth from '../components/Auth';



const Header = () => {

    const { token, initToken,  setIsAdminUser, setIsAdminAdmin, setIsAdminStaff} = useContext(authContext)

    const [isConnect, setIsConnect]=useState(false);

    const disconnect = () =>{
        localStorage.removeItem('token')
        initToken()
        setIsAdminUser(false)
        setIsAdminAdmin(false)
        setIsAdminStaff(false)

    }
    const connect=()=>{
        setIsConnect(true)
    }

    return (
        <>
        {isConnect
        ?<Auth/>
        :<div className='header header--color'>
            <div className='header__nav'>
                <NavLink to ='/'className='header__nav__logo'>
                    <img src='./assets/logos/logo.png' alt="logo de l'association"></img>
                </NavLink> 
                < Navigation />
            </div>
            <div className='header__tilte header__title--color'>
                <h1>Association des Familles d'Accueil de la Mayenne</h1>
            </div>
            {token
                ?<Button onClick={disconnect}><PoweroffOutlined  />Se déconnecter</Button>
                :<Button onClick={connect}>Connexion</Button>
            }
        </div> }</>
    );
};

export default Header;