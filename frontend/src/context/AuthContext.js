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
    isAdminArticle:"",
    setIsAdminArticle:()=>{},
    isAdminLibrary:"",
    setIsAdminLibrary:()=>{},
    connect:"",
    setConnect:()=>{},
    isAuthenticate:false,
    setIsAuthenticate:()=>{}
});

const AuthContextProvider=({ children })=>{
    
const { getAllStaff }=useContext(staffContext);

    const [authProfil, setAuthProfil] = useState('');
    const [token, setToken ] = useState('');
    const [connect, setConnect]=useState(false);
    const [isAuthenticate, setIsAuthenticate]= useState(false);
    const [isAdminUser, setIsAdminUser]=useState(false);
    const [isAdminAdmin, setIsAdminAdmin]=useState(false);
    const [isAdminStaff, setIsAdminStaff]=useState(false);
    const [isAdminArticle, setIsAdminArticle]=useState(false);
    const [isAdminLibrary, setIsAdminLibrary]=useState(false);


    const initToken=()=>{
        setToken(localStorage.getItem('token'))
    }

    const reqInstance = axios.create({
        baseURL: 
         //  'https://assfamaccueil53.org/api'
        //process.env.REACT_APP_URL_REQ
    "http://localhost:3001/api"
     
            }) 

    const reqBearer = axios.create({
        headers:{
            Authorization: `Bearer ${token}`,
                },
       
                baseURL: 
             //   'https://assfamaccueil53.org/api'
                //process.env.REACT_APP_URL_REQ
               "http://localhost:3001/api"
      
                    })
    

    const getProfil = ()=>{
        initToken()
        if(token){
        reqBearer.get(
            `/auth/user/${token}`,
            )
            .then((res)=>{
                setAuthProfil(res.data)
                setIsAuthenticate(true)
                if(res.data.adminRights.includes('users')){
                    setIsAdminUser(true)
                }
                if(res.data.adminRights.includes('adminRights')){
                    setIsAdminAdmin(true)
                }
                if(res.data.adminRights.includes('staff')){
                    setIsAdminStaff(true)
                }
                if(res.data.adminRights.includes('articles')){
                    setIsAdminArticle(true)
                }
                if(res.data.adminRights.includes('library')){
                    setIsAdminLibrary(true)
                }
                getAllStaff()
            })
            .catch(()=>{
                setAuthProfil([''])
            })
        }
    }
    useEffect(()=>{
        getProfil()
    },[token])

    return(

        <authContext.Provider value={ {
            authProfil, setAuthProfil, 
            getProfil, 
            initToken, token, 
            reqInstance, reqBearer, 
            isAdminUser, setIsAdminUser,
            isAdminAdmin, setIsAdminAdmin,
            isAdminStaff, setIsAdminStaff,
            isAdminArticle, setIsAdminArticle,
            isAdminLibrary, setIsAdminLibrary,
            connect, setConnect,
            isAuthenticate, setIsAuthenticate
            } }>
            { children}
        </authContext.Provider>
    )
}
export default AuthContextProvider

