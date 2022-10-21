import React, { useContext, useEffect, useState } from 'react';
import AdminCreateUser from './AdminCreateUser';
import { Button, Modal } from 'antd';
import { usersContext } from '../../context/UsersContext';




const AdminUsers = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const { users, getAllUsers, setShowUsers, showUsers } = useContext(usersContext)
    
    useEffect(()=>{
        getAllUsers()
    },[])


    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    const showModal = (e) => {
        setIsModalVisible(true);
    };
  
    const onClick=()=>{
        setShowUsers(true)
    }
    return (
        <div>
            
            <h1>Les adhérents</h1>
            <div className='usercounter'>Il y a {users.length} adhérents à l'association.</div>

            <div className='createUserModal'>
                <Button type="primary" onClick={showModal}>Créer un nouvel adhérent</Button>
                <Modal
               title="Créer un nouvel adhérent" 
               visible={isModalVisible} 
               destroyOnClose={true}
               onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Fermer
                    </Button>,
                    ]}
                >
                    <AdminCreateUser setIsModalVisible={setIsModalVisible} />
                </Modal>
            </div>
    
    <button onClick={onClick}>Voir tous les adhérents</button>
        
        </div>
    );
};

export default AdminUsers;