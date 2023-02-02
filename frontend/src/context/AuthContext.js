import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { staffContext } from './StaffContext';


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
    setIsAdminStaff:()=>{},
    connect:"",
    setConnect:()=>{}
});

const AuthContextProvider=({ children })=>{
    
const { getAllStaff }=useContext(staffContext);

    const [authProfil, setAuthProfil] = useState('');
    const [token, setToken ] = useState('');
    const [connect, setConnect]=useState(false);
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
        baseURL: 
        //'https://assfamaccueil53.org/api'
        //process.env.REACT_APP_URL_REQ
       "http://localhost:3001/api"
     
            }) 

    const reqBearer = axios.create({
        headers:{
            Authorization: `Bearer ${token}`,
                },
       
                baseURL: 
                //'https://assfamaccueil53.org/api'
                //process.env.REACT_APP_URL_REQ
               "http://localhost:3001/api"
      
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
                getAllStaff()
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
            isAdminStaff, setIsAdminStaff,
            connect, setConnect
            } }>
            { children}
        </authContext.Provider>
    )
}
export default AuthContextProvider

