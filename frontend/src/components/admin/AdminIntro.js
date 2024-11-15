import React, { useContext } from 'react';
import { authContext } from '../../context/AuthContext';
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const AdminIntro = () => {

    const { initToken, authProfil,  setIsAdminUser, setIsAdminAdmin, setIsAdminStaff} = useContext(authContext)
    const { lastName, firstName  } = authProfil

    const disconnect = () =>{
        localStorage.removeItem('token')
        initToken()
        setIsAdminUser(false)
        setIsAdminAdmin(false)
        setIsAdminStaff(false)

    }
    return (
        <div>
            <h1>Tableau de bord Administrateur</h1>
            <p>Bienvenu {firstName} {lastName} !</p>
            <Button onClick={disconnect}><PoweroffOutlined  />Se déconnecter</Button>
        </div>
    );
};

export default AdminIntro;