import React, { useContext } from 'react';
import { authContext } from './AuthContext';
import { libraryContext } from './LibraryContext';


export const bookContext = React.createContext({
  
   likeBook: ()=>{},
   userId:[],
})

const BookContextProvider = ({ children }) => {


    const { reqBearer, authProfil } = useContext(authContext);
    const { getBookListe } = useContext(libraryContext)
    
    const userId=authProfil._id

    const likeBook=(book)=>{ 
        reqBearer.put(`/library/${book._id}/${userId}`)
        .then(()=>{
            getBookListe()
        })
    } 

    
return(
    <bookContext.Provider value={ { likeBook, userId } }>
        { children}
    </bookContext.Provider>
    )
}



export default BookContextProvider;