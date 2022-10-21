import { message } from 'antd';
import React, { useContext, useState } from 'react';
import { authContext } from './AuthContext';

export const usersContext = React.createContext({
    users: [''],
    setUsers:()=>{},
    getAllUsers: ()=>{},
    setShowUsers:()=>{},
    showUsers: ""

})

const UsersContextProvider=({ children })=>{

    const { reqBearer } = useContext(authContext)

    const [users, setUsers ] = useState([''])
    const [showUsers, setShowUsers]=useState(false);

    const getAllUsers =() =>{
        reqBearer.get('/auth/users')
        .then((res)=>setUsers(res.data))
        .catch((error)=>{message(error)})
    }

    return(

        <usersContext.Provider value ={ {users, setUsers, getAllUsers, setShowUsers, showUsers} }>
            { children}
        </usersContext.Provider>
    )
}

export default UsersContextProvider