import { message } from 'antd';
import React, { useContext, useState } from 'react';
import { authContext } from './AuthContext';

export const usersContext = React.createContext({
    users: [''],
    setUsers:()=>{},
    getAllUsers: ()=>{}

})

const UsersContextProvider=({ children })=>{

    const { reqInstance } = useContext(authContext)

    const [users, setUsers ] = useState([''])

    const getAllUsers =() =>{
        reqInstance.get('/auth/users')
        .then((res)=>setUsers(res.data))
        .catch((error)=>{message(error)})
    }

    return(

        <usersContext.Provider value ={ {users, setUsers, getAllUsers} }>
            { children}
        </usersContext.Provider>
    )
}

export default UsersContextProvider