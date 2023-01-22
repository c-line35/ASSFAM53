import React, { useContext } from 'react';
import { Button } from 'antd';
import { staffContext } from '../../context/StaffContext';
import { usersContext } from '../../context/UsersContext';

const AdminStaff = () => {

    const { afficheStaff, setAfficheStaff, allStaff }=useContext(staffContext);
    const { afficheDashBoard, setAfficheDashboard }=useContext(usersContext);

    const seeStaff = ()=>{
        setAfficheStaff(true);
        setAfficheDashboard(false);
    }

    return (
        <div>
            <h1>Conseil d'administration</h1>
            <div>Le conseil d'administration compte {allStaff.length} membres</div>
                <div className='usersButtons'>
                    <Button className='usersButtons__buttons' onClick={seeStaff}>Voir membres</Button> 
                </div>
                
        </div>
    );
};

export default AdminStaff;