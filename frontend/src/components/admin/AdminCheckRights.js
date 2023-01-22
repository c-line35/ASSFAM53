import React, { useContext, useState } from 'react';
import { Checkbox, Button, Modal} from "antd";
import { authContext } from '../../context/AuthContext';
import { usersContext } from '../../context/UsersContext';


const AdminCheckRights = ({ admin, isModalVisible, setIsModalVisible }) => {
    
    const { lastName, firstName, adminRights, _id } = admin;

    const { getAllUsers }= useContext(usersContext)
    const { reqBearer } =useContext(authContext)

    const [listOfRights, setListOfRights] = useState([""])

    const adminRightsOptions= [
        {label:"Droits des administrateurs", value:"adminRights"}, 
        {label:"Adhérents", value:"users"}, 
        {label:"Gestion du bureau", value:"staff"}, 
        {label:"Articles et agenda", value:"articles"}, 
        {label:"Bibliothèque", value:"library"}
    ]

    const handleCancelCreate = () => {
        setIsModalVisible(false);
    }

    const getArrayOfRights=(checkedValues)=>{
    setListOfRights(checkedValues)
    }

    const updateRights=()=>{
        reqBearer.put(
        `auth/user/updateAdminRights/${_id}`,
        {adminRights: listOfRights}
    )
    .then(()=>{
        alert (`Vous venez de changer les droits de ${firstName} ${lastName}` )
        getAllUsers();
        handleCancelCreate();
    })
    }
  
    const deleteRights=()=>{
        reqBearer.put(`auth/user/deleteUserAdmin/${_id}`)
        .then(()=>{
            alert (`Vous venez d'enlever les droits d'administrateur de ${firstName} ${lastName}` )
            getAllUsers();
            handleCancelCreate();
        })
    }

    return (
        <>
      <Modal
               title= "Administrateur "
               visible={isModalVisible} 
               destroyOnClose={true}
               onCancel={handleCancelCreate}
                footer={[
                   
                    <Button key="back" onClick={handleCancelCreate}>
                        Fermer
                    </Button>,
                    ]}
                >
                    <div className='adminRights-name'>{firstName} {lastName}</div>
                   
    <Checkbox.Group 
      defaultValue={adminRights} 
      options={adminRightsOptions} 
      onChange={getArrayOfRights}
      >
    </Checkbox.Group>
    <div className='adminRights-button'>
      <Button onClick={updateRights}>Mettre à jour</Button>
      <Button  onClick={deleteRights}>Enlever les droits d'administrateur</Button>
    </div>
  </Modal>

   </> 
   );
};

export default AdminCheckRights;