import React, { useContext } from 'react';
import { authContext } from '../context/AuthContext';
import Auth from '../components/Auth';
import Manage from '../components/admin/Manage';
import UsersContextProvider from '../context/UsersContext';

const Admin = () => {

    const { authProfil } = useContext(authContext)
    
    
    return (
        <div>
            {authProfil.role === "admin" 
            ?
            <div>
                <UsersContextProvider>
                    <Manage/>
                </UsersContextProvider>
            </div>
            :<Auth/>   
            }
        </div>
    );
};

export default Admin;