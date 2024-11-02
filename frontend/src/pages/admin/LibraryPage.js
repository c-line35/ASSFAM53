import React from 'react';
import { NavLink } from 'react-router-dom'


const LibraryPage = () => {
    return (
        <div>
            <NavLink to={'/management'}><img src="../assets/icones/dashboardColor.png" alt='tableau de bord'/>Retour</NavLink>
        </div>
    );
};

export default LibraryPage;