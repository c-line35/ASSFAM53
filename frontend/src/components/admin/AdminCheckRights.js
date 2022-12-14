import React, { useContext, useState } from 'react';
import { Collapse, Checkbox, Button} from "antd";
import { authContext } from '../../context/AuthContext';


const { Panel }=Collapse;

const AdminCheckRights = (user) => {
const { lastName, firstName, adminRights, _id } = user.user
    const { reqBearer } =useContext(authContext)
    const [listOfRights, setListOfRights] = useState([""])

    const adminRightsOptions= [
        {label:"Adhérents", value:"users"}, 
        {label:"Droits des administrateurs", value:"adminRights"}, 
        {label:"Gestion du bureau", value:"staff"}, 
        {label:"Articles et agenda", value:"articles"}, 
        {label:"Bibliothèque", value:"library"}
    ]


    const getDefaultChecked=()=>{
        setListOfRights(adminRights)
    }

    const getArrayOfRights=(checkedValues)=>{
    setListOfRights(checkedValues)
    reqBearer.put(
        `auth/user/updateAdminRights/${_id}`,
        {adminRights: checkedValues}
    )
    .then(()=>{
        alert (`Vous venez de changer les droits de ${firstName} ${lastName}` )
    })
    }
  
   
    return (
        <div className="adminList">
                <Collapse  onChange={getDefaultChecked}>
                 <Panel key={lastName} header={lastName+" "+ firstName} >
                                <Checkbox.Group defaultValue={adminRights} options={adminRightsOptions} onChange={getArrayOfRights}>
                                </Checkbox.Group> 
                            </Panel>
                        </Collapse>
                        <Button>Supprimer cet administrateur</Button>
                      
                </div>
             
    );
};

export default AdminCheckRights;