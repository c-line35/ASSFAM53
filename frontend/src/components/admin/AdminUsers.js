import React, { useContext, useEffect, useState } from 'react';
import AdminCreateUser from './AdminCreateUser';
import { Button, Modal } from 'antd';
import { usersContext } from '../../context/UsersContext';
import { authContext } from '../../context/AuthContext';


const AdminUsers = () => {
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);

    const { getAllUsers, setAfficheAdmins, setAfficheUsers, setAfficheDashboard, users } = useContext(usersContext);
 
    const { isAdminUser }=useContext(authContext);

    const handleCancelCreate = () => {
        setIsModalCreateVisible(false);
    };
    
    const showModalCreate = (e) => {
        setIsModalCreateVisible(true);
    };
   
    useEffect(()=>{
        getAllUsers()
    },[])

const seeUsers=()=>{
    setAfficheDashboard(false)
    setAfficheUsers(true)
}
const seeAdmins=()=>{
    setAfficheDashboard(false)
    setAfficheAdmins(true)
}

    return (
        <div>
            
            <h1>Les adhérents</h1>
           <div className='usercounter'>Il y a {users.length} adhérents à l'association.</div> 
           <div className='usersButtons'>
           <Button className='usersButtons__buttons' onClick={seeUsers}>Voir tous les adhérents</Button> 
 {isAdminUser&&
   <>
            <div className='createUserModal'>
                <Button className='usersButtons__buttons' type="primary" onClick={showModalCreate}>Créer un nouvel adhérent</Button>
                <Modal
               title="Créer un nouvel adhérent" 
               visible={isModalCreateVisible} 
               destroyOnClose={true}
               onCancel={handleCancelCreate}
                footer={[
                    <Button key="back" onClick={handleCancelCreate}>
                        Fermer
                    </Button>,
                    ]}
                >
                    <AdminCreateUser setIsModalVisible={setIsModalCreateVisible} />
                </Modal>
            </div>
  
 
  <Button className='usersButtons__buttons' onClick={seeAdmins}>Gestion des administrateurs</Button> 
  </>
}  
</div>

    </div>
    );
};

export default AdminUsers;