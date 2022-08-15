import React, { useEffect, useState } from 'react';
import axios from 'axios';


export const authContext = React.createContext({
    authProfil: null, 
    reqAuth:null,
    reqBearer: null,
    getProfil: ()=>{},
    initToken:()=>{},
});

const AuthContextProvider=({ children })=>{

    const [authProfil, setAuthProfil] = useState('');
    const [ token, setToken ]= useState('');

    useEffect(()=>{
        initToken()
    },[]);

    const initToken =() =>{
        setToken(localStorage.getItem('token'))
        console.log(localStorage)
    };
    

    const getProfil = ()=>{
    localStorage.length >0
    ?axios.get(`http://localhost:3001/api/auth/user/${token}`)
        .then((res)=>{
            setAuthProfil(res.data) 
        })
    :setAuthProfil('')
    }

    return(

        <authContext.Provider value={ {authProfil, setAuthProfil, getProfil, initToken, token} }>
            { children}
        </authContext.Provider>
    )
}
export default AuthContextProvider

