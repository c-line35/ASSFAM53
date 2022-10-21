import React, { useContext } from 'react';
import { authContext } from '../context/AuthContext';
import Auth from '../components/Auth';
import Manage from '../components/admin/Manage';


const Admin = () => {

    const { authProfil } = useContext(authContext)
    
    
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