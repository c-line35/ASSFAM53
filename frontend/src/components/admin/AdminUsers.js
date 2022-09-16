import React, { useContext, useEffect, useState } from 'react';
import AdminCreateUser from './AdminCreateUser';
import { Button, Modal } from 'antd';
import { usersContext } from '../../context/UsersContext';
import User from '../User';

const AdminUsers = () => {

    const [allUsers, setAllUsers]= useState(false)
    
   

    const { users, getAllUsers } = useContext(usersContext)
    
    useEffect(()=>{
        getAllUsers()
    },[])
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
    const isAllUsers = () =>{
        allUsers
        ?setAllUsers(false)
        :setAllUsers(true)
    }
    return (
        <div>
            <h1>Les adhérents</h1>
            <div className='usercounter'>Il y a {users.length} adhérents à l'association.</div>
            <Button type="primary" onClick={showModal}>Créer un adhérent</Button>
                <Modal title="Créer un adhérent" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <AdminCreateUser />
                </Modal>
                    
                  



            <Button onClick={isAllUsers}>Voir tous les adhérents</Button>
                    {allUsers &&
                        users.map((user)=>(<User key={user._id} user={user}/>))
                    } 
        </div>
    );
};

export default AdminUsers;