import React, { useContext, useState, useEffect } from 'react';
import { authContext } from './AuthContext';
import { libraryContext } from './LibraryContext';


export const bookContext = React.createContext({
    likeBook: ()=>{},
    userId:[],
    getNoticeListe:()=>{},
    noticeListe:[],
    setNoticeListe:()=>{},
    postNotice:()=>{},
    deleteNotice:()=>{}
})

const BookContextProvider = ({ children }) => {


    const { reqBearer, authProfil } = useContext(authContext);
    const { getBookListe } = useContext(libraryContext);

    const [noticeListe, setNoticeListe] = useState([]);

    const userId=authProfil._id

    const likeBook=(book)=>{ 
        reqBearer.put(`/library/${book._id}/${userId}`)
        .then(()=>{
            getBookListe()
        })
    } 

    const getNoticeListe = (book)=>{
        reqBearer.get(`/notice/book/${book._id}`)
        .then((res)=>{
            setNoticeListe(res.data)
        })
    }

            
    const postNotice = (book, noticeValues)=>{
        reqBearer.post(`/notice/${book._id}/${userId}`, noticeValues)
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
    <bookContext.Provider value={ { noticeListe, setNoticeListe, getNoticeListe, likeBook, userId, postNotice, deleteNotice } }>
        { children}
    </bookContext.Provider>
    )
}



export default BookContextProvider;