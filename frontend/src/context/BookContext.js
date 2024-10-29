import React, { useContext, useState, useEffect } from 'react';
import { authContext } from './AuthContext';
import { libraryContext } from './LibraryContext';


export const bookContext = React.createContext({
    likeBook: ()=>{},
    userId:[],
    postNotice:()=>{},
    deleteNotice:()=>{}
})

const BookContextProvider = ({ children }) => {


    const { reqBearer, authProfil } = useContext(authContext);
    const { getBookListe } = useContext(libraryContext);

    const firstName= authProfil.firstName;
    const userId=authProfil._id;

    const likeBook=(book)=>{ 
        reqBearer.put(`/library/${book._id}/${userId}`)
        .then(()=>{
            getBookListe()
        })
    } 
        
    const postNotice = (book, noticeValues)=>{
        let allValues={
            content:noticeValues.content,
            level:noticeValues.level,
            firstName: firstName
        }
        reqBearer.post(`/notice/${book._id}/${userId}`, allValues)
        .then(()=>{
            getBookListe()
        })
    }

    const deleteNotice=(notice)=>{
        reqBearer.delete(`/notice/${notice._id}/${userId}`)
        .then(()=>{
            getBookListe()
        })
    }

return(
    <bookContext.Provider value={ { likeBook, userId, postNotice, deleteNotice } }>
        { children}
    </bookContext.Provider>
    )
}



export default BookContextProvider;