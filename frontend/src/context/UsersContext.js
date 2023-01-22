import React, { useContext, useEffect, useState } from 'react';
import { authContext } from './AuthContext';

export const usersContext = React.createContext({

    users: [''],
    setUsers:()=>{},
    getAllUsers: ()=>{},
    year:'',
    afficheAdmins:'',
    setAfficheAdmins:()=>{},
    afficheUsers:'',
    setAfficheUsers:()=>{},
    afficheDashBoard:'',
    setAfficheDashboard:()=>{},
    isEdit:"",
    setIsEdit:()=>{},
    dateFilter:"",
    setFilterDate:()=>{},
    arrayDate:'',
   getArrayDate:()=>{},
   allAdmins:"",
   setAllAdmins:()=>{}
})

const UsersContextProvider=({ children })=>{

    const date = new Date()
    const year = date.getFullYear()
    
    const getArrayDate=()=>{
        let arrayDate=[];
        let y = 2020;
        while(y< year+1){
            y++
            arrayDate.push(y)
        }
        return arrayDate
    }

       

    const { reqBearer, token } = useContext(authContext)

    const [users, setUsers ] = useState([''])
    const[afficheUsers, setAfficheUsers]= useState(false);
    const[afficheAdmins, setAfficheAdmins]= useState(false);
    const[afficheDashBoard, setAfficheDashboard]=useState(true);
    const [isEdit, setIsEdit]=useState(false);
    const [dateFilter, setFilterDate]=useState(year);
    const [allAdmins, setAllAdmins]= useState(['']);
  

    useEffect(()=>{
        getAllUsers()
    }, [dateFilter, isEdit])

    useEffect(()=>{
        getAllAdmins()
    }, [users])

    const getAllUsers =() =>{
        token&&
        reqBearer.get('/auth/users')
        .then((res)=>{
            setUsers(res.data
               .filter((el)=>el.end.includes(dateFilter)) 
               .sort((a,b)=>a.lastName.toLowerCase()>b.lastName.toLowerCase()? 1:-1)) 
        })
    }
     const getAllAdmins=()=>{
        token&&
       reqBearer.get('/auth/users/admins')
       .then((res)=>{
       setAllAdmins( res.data
               .filter(el=>el.lastName.toLowerCase() !== "developpeur")
               .sort((a,b)=>a.lastName.toLowerCase()>b.lastName.toLowerCase()? 1:-1))
       })
     }
     
    return(

        <usersContext.Provider value ={ 
            {
            users, 
            setUsers, 
            getAllUsers, 
            year,
            afficheDashBoard, setAfficheDashboard,
            afficheAdmins, setAfficheAdmins,
            afficheUsers, setAfficheUsers,
            isEdit, setIsEdit,
            dateFilter, setFilterDate,
            getArrayDate, 
            allAdmins, setAllAdmins  
            } 
            }>
            { children }
        </usersContext.Provider>
    )
}

export default UsersContextProvider