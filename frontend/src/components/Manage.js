import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthContext';
import AdminCreateUser from './AdminCreateUser';
import { Button } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons';
import { usersContext } from '../context/UsersContext';
import User from './User';
import Header from './Header';

const Manage = () => {

    const [createUser, setCreateUser] = useState(false)
    const [allUsers, setAllUsers]= useState(false)
    const { getProfil, authProfil } = useContext(authContext)
    const { lastName, firstName } = authProfil

    const { users, setUsers, getAllUsers } = useContext(usersContext)
    
    useEffect(()=>{
        getAllUsers()
    },[])
    
    const disconnect = () =>{
        localStorage.removeItem('token')
        getProfil() 
    }
        

    const isCreateUser = () =>{
        createUser
        ?setCreateUser(false)
        :setCreateUser(true)
    }
    const isAllUsers = () =>{
        allUsers
        ?setAllUsers(false)
        :setAllUsers(true)
    }

    return (
        <div>
            <Header />
            <div className='presentation'>
                <p>{firstName} {lastName}</p>
                <Button onClick={disconnect}><PoweroffOutlined  />Se déconnecter</Button>
            </div>
            
            <Button onClick={isCreateUser}>Enregistrer un nouvel adhérent </Button>
            {createUser && <AdminCreateUser />}
             
            <Button onClick={isAllUsers}>Voir tous les adhérents</Button>
            {allUsers &&
                users.map((user)=>(<User key={user._id} user={user}/>))
            }
        </div>
    );
};

export default Manage;