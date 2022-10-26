import React, { useContext, useEffect, useState } from 'react';
import { authContext } from './AuthContext';

export const usersContext = React.createContext({
    users: [''],
    setUsers:()=>{},
    getAllUsers: ()=>{},
    setShowUsers:()=>{},
    showUsers: "",
    usersOfYear:[''],
    setUsersOfYear:()=>{},
    year:''

})

const UsersContextProvider=({ children })=>{

    const date = new Date()
    const year = date.getFullYear()

    const { reqBearer } = useContext(authContext)

    const [users, setUsers ] = useState([''])
    const [showUsers, setShowUsers]=useState(false);
    const [usersOfYear, setUsersOfYear]=useState([''])
    

    const getAllUsers =() =>{
        reqBearer.get('/auth/users')
        .then((res)=>{
            setUsers(res.data)
            setUsersOfYear(res.data.filter(el=>el.end.includes(year)))
        })
    }
   
    useEffect(()=>{
        getAllUsers()
    },[])
    
    return(

        <usersContext.Provider value ={ {users, setUsers, getAllUsers, setShowUsers, showUsers, usersOfYear, setUsersOfYear, year} }>
            { children}
        </usersContext.Provider>
    )
}

export default UsersContextProvider