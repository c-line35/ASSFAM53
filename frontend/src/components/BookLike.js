import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthContext';
import { libraryContext } from '../context/LibraryContext';

const BookLike = ({ bookLike, bookId }) => {

    const {reqBearer, authProfil} = useContext(authContext);
    const {getBookListe} = useContext(libraryContext)

    const [isBookLiked, setIsBookLiked]=useState(false)

    const userId=authProfil._id

    const userLike =()=>{
        const like = bookLike.find((user)=>user===userId)
        like?setIsBookLiked(true):setIsBookLiked(false)
    }
useEffect(()=>{
    userLike()
},[])

    const likeBook=()=>{
        const like = bookLike.find((user)=>user===userId)
        like?setIsBookLiked(false):setIsBookLiked(true)    
        reqBearer.put(`/library/${bookId}/${userId}`)
        .then(()=>{
            getBookListe()
        })
    }

    return (
        <div id='like'>
            {isBookLiked
            ?<div className='book_test_like'onClick={()=>{likeBook()}} title='Enlever des favoris'>
                <img src='assets/icones/coeur-rouge.png' alt='favoris' />
            </div> 
            :<div className='book_test_like'onClick={()=>{likeBook()}} title='Ajouter aux favoris'>
                <img src='assets/icones/coeur-vide.png' alt='favoris' />
            </div> 
            }
        </div>
    );
};

export default BookLike;