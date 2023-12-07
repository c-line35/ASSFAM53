import React, { useEffect, useState, useContext } from 'react';
import { authContext } from './AuthContext';


export const libraryContext = React.createContext({
    bookListe:[],
    getBookListe:()=>{}
})

const LibraryContextProvider = ({ children }) => {

const { reqInstance }=useContext(authContext)

const [bookListe, setBookListe]=useState([]);

const getBookListe = () =>{
    reqInstance.get("/library")
    .then((res)=>{setBookListe(res.data)})
    }
    
    useEffect(()=>{
        getBookListe()
},[])

return(
    <libraryContext.Provider value={ { bookListe, getBookListe} }>
        { children}
    </libraryContext.Provider>
    )
}



export default LibraryContextProvider;