import React, { useContext } from 'react';
import User from './User';


import { usersContext } from '../../context/UsersContext';





const Users = () => {
 
  const { users, setShowUsers, showUsers } = useContext(usersContext);
console.log(showUsers)
const onClick=()=>{
  setShowUsers(false)
}
    return (
        <div>
      {/*   <Search
      placeholder="rechercher"
      onChange={onChange}
      style={{
        width: 200,
      }}
    />  */}
    <form >
      <input ></input>
      <button>Rechercher</button>
    </form>
           {users
           .sort((a,b)=>a.lastName.toLowerCase()>b.lastName.toLowerCase()? 1:-1)
           .map((user)=>(<User key={user._id} user={user}/>))} 
            <button onClick={onClick}>revenir au tableau de bord</button>  
        </div>
    );
};

export default Users;