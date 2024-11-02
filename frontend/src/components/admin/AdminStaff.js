import React, { useContext } from 'react';
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
            <h3>Conseil d'administration</h3>
            <div>Le conseil d'administration compte {allStaff.length} membres</div> 
            <button className='button1' onClick={seeStaff}>Voir les membres</button> 
        </div>
    );
};

export default AdminStaff;