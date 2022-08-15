import React, { useContext, useEffect } from 'react';
import { authContext } from '../context/AuthContext';
import Auth from '../components/Auth';
import Manage from '../components/Manage';



const Admin = () => {

    const { authProfil, getProfil, token} = useContext(authContext)
    console.log(getProfil)

    useEffect(()=>{
        getProfil()
    }, [token])


    return (
        <div>
            {authProfil.role === "admin" 
            ?<Manage/>
            :<Auth/>   
            }
        </div>
    );
};

export default Admin;