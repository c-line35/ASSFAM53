import React, { useEffect, useState, useContext } from 'react';
import { authContext } from './AuthContext';


export const libraryContext = React.createContext({
    bookListe:[],
    getBookListe:()=>{}
})

const LibraryContextProvider = ({ children }) => {

const { reqBearer }=useContext(authContext)

const [bookListe, setBookListe]=useState([]);



    const getBookListe = () =>{
        reqBearer.get("/library")
        .then((res)=>{
            setBookListe(res.data)
            getBookListe()
            })
        }

    useEffect(()=>{
            getBookListe()
    },[])
    
return(
    <libraryContext.Provider value={ { bookListe, getBookListe } }>
        { children}
    </libraryContext.Provider>
    )
}



export default LibraryContextProvider;