import React from 'react';
import { NavLink } from 'react-router-dom'

const Identification = () => {
    return (
        <div className = 'identification'>
            <div className='identification__text'>
            <p>Si vous êtes adhérent à l'association, vous pourrez prochainement vous identifier. </p>
            <ul>Vous aurez alors accès à de nombreuses fonctionnalités comme:
                <li>L'accès à la bibliothèque de l'association</li>
                <li>La localisation des membres</li>
                <li>La mise à disposition de documents</li>
                <li>L'accès aux petites annonces</li>
                <li>...</li>
            </ul>
            <p>En attendant, vous pouvez toujours visiter notre nouveu site!</p>
            <NavLink to='/Home' className ='button'><div>Accéder au site</div></NavLink>
            <h2>Merci pour votre patience!</h2>
            </div>
        </div>
    );
};

export default Identification;