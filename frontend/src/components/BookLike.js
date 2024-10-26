import React, { useContext, useState, useEffect } from 'react';
import { bookContext } from '../context/BookContext';

const BookLike = ({ book }) => {

    const { likeBook, userId } = useContext (bookContext)

    const [isBookLike, setIsBookLike]= useState(false)

    const getIsBookLike = ()=>{
        if(book){
        const like = book.likes.find((user)=>user === userId)
        like? setIsBookLike(true): setIsBookLike(false)
        }
    }
    
    useEffect(()=>{
        getIsBookLike()
    },[likeBook])


    return (
        <div >
        {isBookLike
        ?<div >
            <img onClick={()=>{likeBook(book)}} title='Enlever des favoris' src='assets/icones/coeur-rouge.png' alt='favoris' />
        </div> 
        :<div>
            <img onClick={()=>{likeBook(book)}} title='Ajouter aux favoris' src='assets/icones/coeur-vide.png' alt='favoris' />
        </div> 
        }
    </div>      
    );
};

export default BookLike;