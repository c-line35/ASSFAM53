import React, { useContext, useEffect, useState } from 'react';
import { authContext } from './AuthContext';

export const staffContext = React.createContext({
allSatff:[''],
getAllStaff:()=>{},
afficheStaff:"",
setAfficheSatff:()=>{},

})

const StaffContextProvider=({ children })=>{
    const { reqBearer, token } = useContext(authContext);

    const [allStaff, setAllStaff]= useState(['']);
    const [afficheStaff, setAfficheStaff]=useState(false);

    useEffect(()=>{
        getAllStaff()
   },[] )
    const getAllStaff=()=>{
        token?
        reqBearer.get('/staff/infos/conn')
        .then((res)=>{
           setAllStaff(res.data)
        })
        :reqBearer.get('/staff')
        .then((res)=>{
           setAllStaff(res.data)
        })
    }

    
return(
    <staffContext.Provider value ={
        {
        allStaff, getAllStaff,
        afficheStaff, setAfficheStaff,
    }
    }>
        { children }
    </staffContext.Provider>
)
}

export default StaffContextProvider;