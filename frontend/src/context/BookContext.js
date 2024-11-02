import React, { useContext, useState, useEffect } from 'react';
import { authContext } from './AuthContext';
import { libraryContext } from './LibraryContext';


export const bookContext = React.createContext({
    likeBook: ()=>{},
    userId:[],
    postNotice:()=>{},
    deleteNotice:()=>{},
    updateNotice:()=>{}
})

const BookContextProvider = ({ children }) => {


    const { reqBearer, authProfil } = useContext(authContext);
    const { getBookListe } = useContext(libraryContext);

    const userId=authProfil._id;

    const likeBook=(book)=>{ 
        reqBearer.put(`/library/${book._id}/${userId}`)
        .then(()=>{
            getBookListe()
        })
    } 
        
    const postNotice = (book, noticeValues)=>{
        let firstName =  noticeValues.anonymous? 'Anonyme': authProfil.firstName
        let allValues={
            content:noticeValues.content,
            level:noticeValues.level,
            firstName
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

    const updateNotice =(noticeValues, notice)=>{
        let firstName =  noticeValues.anonymous? 'Anonyme': authProfil.firstName
        let allValues={
            content:noticeValues.content,
            level:noticeValues.level,
            firstName
        }
        reqBearer.put(`/notice/${notice._id}`, allValues)
        .then(()=>{
            getBookListe()
        })
    }

return(
    <bookContext.Provider value={ { likeBook, userId, postNotice, deleteNotice, updateNotice } }>
        { children}
    </bookContext.Provider>
    )
}



export default BookContextProvider;