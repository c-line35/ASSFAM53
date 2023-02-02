import React, { useContext, useState } from 'react';
import { usersContext } from '../../context/UsersContext';


import { Input, Space, Table } from 'antd';


import AdminCheckRights from './AdminCheckRights';
import { authContext } from '../../context/AuthContext';


const { Search } = Input;

const AdminRights = () => {

    const { users, setAfficheDashboard, setAfficheAdmins, allAdmins, getAllUsers } = useContext(usersContext)
    const { reqBearer, isAdminAdmin} = useContext(authContext);
   
    const [userToAdmin, setUserToAdmin]=useState();
    const [messageError, setMessageError]=useState();
    const [admin, setAdmin]=useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
  
const back=()=>{
    setAfficheDashboard(true)
    setAfficheAdmins(false)
   }
   const onSearch = (value) => {
    
    setMessageError()
    if (value){
    setMessageError()
    const usersFind= users.filter(el=>el.lastName.toLowerCase().includes(value.toLowerCase())||el.firstName.toLowerCase().includes(value.toLowerCase()))
    if (usersFind.length>0){
      setUserToAdmin(usersFind)
     
      
    }else{
        setMessageError('Utilisateur non trouvé')
        setUserToAdmin();
    }
   }else{
    setUserToAdmin();
   }
  };

   const updateRole=(e)=>{
  
    if(window.confirm("Vous êtes sur le point de modifier les droits d'administrateur de cet adhérent")){
    reqBearer.put(`auth/user/updateUserAdmin/${e.target.value}`)
    .then(()=>{
        getAllUsers();
        setUserToAdmin();
        
    })
    .catch((error)=>{
      setUserToAdmin()
      setMessageError(error.response.data.message)})
    
   }
  }

const getDataSource=()=>{
  const dataSource=[];
  if (allAdmins){
    for (let admin of allAdmins){
      dataSource.push({
        key:admin._id,
        name:  `${admin.lastName} ${admin.firstName}`,
        users: `${admin.adminRights.includes("users")?"adhérents":""}`,
        adminRights: `${admin.adminRights.includes("adminRights")?"administrateurs":""}`,
        staff: `${admin.adminRights.includes("staff")?"bureau":""}`,
        articles: `${admin.adminRights.includes("articles")?"articles":""}`,
        library: `${admin.adminRights.includes("library")?"bibliothèque":""}`,
          })
      }}
    return dataSource
}


const columns = [
  {
    title: 'Administrateur',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Adhérents',
    dataIndex: 'users',
    key: 'users',
  },
  {
    title: 'Droits des administrateurs',
    dataIndex: 'adminRights',
    key: 'adminRights',
  },
  {
    title: 'Bureau/CA',
    dataIndex: 'staff',
    key: 'staff',
  },
  {
    title: 'Article/Agenda',
    dataIndex: 'articles',
    key: 'articles',
  },
  {
    title: 'Bibliothèque',
    dataIndex: 'library',
    key: 'library',
  },
];
  const selectAdmin=(record)=>{
    if(isAdminAdmin){
    reqBearer.get(`/auth/idUser/${record.key}`)
    .then((res)=>
    {
      setAdmin(res.data)
      setIsModalVisible('true')
    })
  }else{
    alert("Vous n'avez pas les droits pour effectuer ces opérations")
  }
  }

  
    return (
      <div>
           <h4>Droits des administrateurs</h4>
           <div className='adminRights-head'>
           {isAdminAdmin&&
            <Space direction="vertical">
            Ajouter un administrateur: 
    <Search
      placeholder="nom ou prenom"
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
    </Space>
    } 
       <div className='backDashboard' onClick={back}>
         <img src="../assets/icones/dashboardColor.png" alt='tableau de bord'/>
         Retour
       </div> 
    </div>
    {messageError&&
    <div className='message-error'>{messageError}</div>
  }
    {userToAdmin&&
    <div className='userToAdmin'>
       {
         userToAdmin.map((user)=>  
          <div key={user._id} className="userToAdmin__user" >
                    <div className='userToAdmin__id' value={user._id}>{user.lastName} {user.firstName}</div>
                    <button value={user._id}onClick={updateRole}>Rendre Administateur</button>
          </div>
          )
        }
       
    </div>
}
<Table  
        columns={columns} 
        dataSource={getDataSource()} 
        pagination={false}
        onRow={(record, rowIndex)=>{
          return{
            onClick : event =>{selectAdmin(record)}
          }
        }}
        />
        {admin&&
  <AdminCheckRights
    admin={admin} 
    setAdmin={setAdmin}
    isModalVisible={isModalVisible}
    setIsModalVisible={setIsModalVisible}
    />}
        </div>
    );
};

export default AdminRights;