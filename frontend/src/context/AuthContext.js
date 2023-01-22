import React, { useEffect, useState } from 'react';
import axios from 'axios';


export const authContext = React.createContext({
    authProfil: null, 
    reqInstance:null,
    reqBearer: null,
    getProfil: ()=>{},
    initToken:()=>{},
    token:"",
    isAdminUser:false,
    setIsAdminUser:()=>{},
    isAdminAdmin:false,
    setIsAdminAdmin:()=>{},
    isAdminStaff:"",
    setIsAdminStaff:()=>{}
});

const AuthContextProvider=({ children })=>{
  
    const [authProfil, setAuthProfil] = useState('');
    const [ token, setToken ] = useState('');
    const [isAdminUser, setIsAdminUser]=useState(false);
    const [isAdminAdmin, setIsAdminAdmin]=useState(false);
    const [isAdminStaff, setIsAdminStaff]=useState(false);


    const initToken=()=>{
        setToken(localStorage.getItem('token'))
    }
 
    useEffect(()=>{
        getProfil()
    },[token])
    const reqInstance = axios.create({
        baseURL: process.env.REACT_APP_URL_REQ
        
       // "http://localhost:3001/api"
     //  'https://assfamaccueil53.org/api'
            }) 

    const reqBearer = axios.create({
        headers:{
            Authorization: `Bearer ${token}`,
                },
       
        baseURL: process.env.REACT_APP_URL_REQ
        // 'http://localhost:3001/api'
   // ' https://assfamaccueil53.org/api'
                    })
    

    const getProfil = ()=>{
        initToken()
        token
        ?reqBearer.get(
            `/auth/user/${token}`,
            )
            .then((res)=>{
                setAuthProfil(res.data)
                if(res.data.adminRights.includes('users')){
                    setIsAdminUser(true)
                }
                if(res.data.adminRights.includes('adminRights')){
                    setIsAdminAdmin(true)
                }
                if(res.data.adminRights.includes('staff')){
                    setIsAdminStaff(true)
                }
            })
        :setAuthProfil('')
    }
       
    return(

        <authContext.Provider value={ {
            authProfil, setAuthProfil, 
            getProfil, 
            initToken, token, 
            reqInstance, reqBearer, 
            isAdminUser, setIsAdminUser,
            isAdminAdmin, setIsAdminAdmin,
            isAdminStaff, setIsAdminStaff
            } }>
            { children}
        </authContext.Provider>
    )
}
export default AuthContextProvider

