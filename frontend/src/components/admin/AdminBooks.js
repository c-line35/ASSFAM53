import React, { useContext, useState } from 'react';
import { authContext } from '../../context/AuthContext';
import { libraryContext } from '../../context/LibraryContext';
import { NavLink } from 'react-router-dom'

const AdminBooks = () => {

    const { isAdminLibrary }=useContext(authContext)
    const { bookListe }=useContext(libraryContext)

    const [isModalBookVisible, setIsModalBookVisible]= useState(false)

    return (
        <div>
            <h3>Bibliothèque</h3>
            {isAdminLibrary&&
                <div>
                    <p>Votre bibliothèque contient {bookListe.length} livres</p>
                    <button className='button1' onClick={()=>setIsModalBookVisible(true)} >Créer un nouveau livre</button> 
                    <button className='button1' ><NavLink to="/adminLibrary">Voir tous les livres</NavLink></button> 
                </div>
            }
        </div>
    );
};

export default AdminBooks;