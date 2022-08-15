import React, { useContext, useState } from 'react';
import { authContext } from '../context/AuthContext';
import AdminCreateUser from './AdminCreateUser';
import { Button } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons';

const Manage = () => {
    const [createUser, setCreateUser] = useState(false)
    const { getProfil, authProfil } = useContext(authContext)
    const { lastName, firstName } = authProfil

    const disconnect = () =>{
        localStorage.removeItem('token')
        getProfil()
    }

    const isCreateUser = () =>{
        createUser
        ?setCreateUser(false)
        :setCreateUser(true)
    }
    return (
        <div>
            <h1>La page ADMIN</h1>
            <div className='presentation'>
                <p>{firstName} {lastName}</p>
                <Button><PoweroffOutlined onClick={disconnect} />Se déconnecter</Button>
            </div>
            
            <Button onClick={isCreateUser}>Enregistrer un nouvel adhérent </Button>
            {createUser && <AdminCreateUser />}
           
        </div>
    );
};

export default Manage;