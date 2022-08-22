import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const authContext = React.createContext({
    authProfil: null, 
    reqInstance:null,
    reqBearer: null,
    getProfil: ()=>{},
    initToken:()=>{},
});

const AuthContextProvider=({ children })=>{

    const [authProfil, setAuthProfil] = useState('');
    const [ token, setToken ] = useState('');
   
    const initToken = async()=>{
            setToken(localStorage.getItem('token'));
        }  

    useEffect(()=>{
        initToken()
        }) 

    useEffect(()=>{
        getProfil()
    }, [token])

    const reqInstance = axios.create({
        baseURL: 
        'http://localhost:3001/api'
        //'https://assfamaccueil53.org/api'
            }) 

    const reqBearer = axios.create({
        headers:{
            Authorization: `Bearer ${token}`,
                },
        baseURL: 
        'http://localhost:3001/api'
        //'https://assfamaccueil53.org/api'
                    })
    

    const getProfil = ()=>{
        token
        ?reqInstance.get(`/auth/user/${token}`)
            .then((res)=>{
                setAuthProfil(res.data)
            })
        :setAuthProfil('')
        }
    
     
    return(

        <authContext.Provider value={ {authProfil, setAuthProfil, getProfil, initToken, token, reqInstance, reqBearer} }>
            { children}
        </authContext.Provider>
    )
}
export default AuthContextProvider

