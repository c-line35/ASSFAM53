import React, { useContext, useEffect, useState } from 'react';
import { authContext } from './AuthContext';

export const staffContext = React.createContext({
allSatff:[''],
getAllStaff:()=>{},
afficheStaff:"",
setAfficheSatff:()=>{},
staffWithCoord:[''],
setStaffWithCoord:()=>{}

})

const StaffContextProvider=({ children })=>{
    const { reqBearer, isAuthenticate } = useContext(authContext);

    const [allStaff, setAllStaff]= useState(['']);
    const [afficheStaff, setAfficheStaff]=useState(false);
    const [staffWithCoord, setStaffWithCoord]=useState([''])

  
    const getAllStaff=()=>{
        isAuthenticate?
        reqBearer.get('/staff/infos/conn')
        .then((res)=>{
           setAllStaff(res.data)
        })
        :reqBearer.get('/staff')
        .then((res)=>{
           setAllStaff(res.data)
        })
    }
    const getStaffWithCoord=()=>{
        if (allStaff.length>1){
            const newStaff = []
            for(let staff of allStaff){
                if(staff.coordonnees && staff.coordonnees.length>0){
                    newStaff.push(staff)
                }
            }
        setStaffWithCoord(newStaff)
        }
    }

    useEffect(()=>{
        getAllStaff()
   },[] )

   useEffect(()=>{
    getStaffWithCoord()
   },[allStaff])


return(
    <staffContext.Provider value ={
        {
        allStaff, getAllStaff,
        afficheStaff, setAfficheStaff,
        staffWithCoord
        }
    }>
        { children }
    </staffContext.Provider>
)
}

export default StaffContextProvider;