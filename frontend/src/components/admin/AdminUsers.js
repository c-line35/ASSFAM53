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
            <h3>Les adhérents</h3>
           <div className='usercounter'>Il y a {users.length} adhérents à l'association.</div> 
          
           <button className='button1' onClick={seeUsers}>Voir tous les adhérents</button> 
           <button className='button1' onClick={seeAdmins}>Voir les administrateurs</button> 
 {isAdminUser&&
   <>
            
                <button className='button1' type="primary" onClick={showModalCreate}>Créer un nouvel adhérent</button>
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
           
  </>
}  
</div>

  
    );
};

export default AdminUsers;