import React, { useContext, useState } from 'react';
import { authContext } from './AuthContext';
import { libraryContext } from './LibraryContext';


export const bookContext = React.createContext({
  
   likeBook: ()=>{},
   userId:[],
   noticeListe:[],
   getNoticeListe: ()=>{}
})

const BookContextProvider = ({ children }) => {


    const { reqBearer, authProfil } = useContext(authContext);
    const { getBookListe } = useContext(libraryContext);
    
    const [noticeListe, setNoticeListe] = useState([])

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
            setNoticeListe(res.data.sort((a,b)=>a.date>b.date? -1:1))})
    }

return(
    <bookContext.Provider value={ { likeBook, userId, noticeListe, getNoticeListe } }>
        { children}
    </bookContext.Provider>
    )
}



export default BookContextProvider;