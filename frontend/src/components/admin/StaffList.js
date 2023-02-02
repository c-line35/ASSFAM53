import React, { useContext, useState } from 'react';
import { usersContext } from '../../context/UsersContext';
import { staffContext } from '../../context/StaffContext';
import { authContext } from '../../context/AuthContext';

import { Input, Space, Table } from 'antd';
import UpdateStaff from './UpdateStaff';

const { Search } = Input;

const StaffList = () => {

    const { setAfficheDashboard, users }=useContext(usersContext);
    const { setAfficheStaff, allStaff, getAllStaff }=useContext(staffContext);
    const { reqBearer, isAdminStaff} = useContext(authContext);
    
    const [staffToAdmin, setStaffToAdmin]=useState();
    const [messageError, setMessageError]=useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [staff, setStaff]=useState();
   

    const back=()=>{
        setAfficheDashboard(true)
        setAfficheStaff(false)
       }
       const onSearch = (value) => {
          setMessageError()
          if (value){
          setMessageError()
          const usersFind= users.filter(el=>el.lastName.toLowerCase().includes(value.toLowerCase())||el.firstName.toLowerCase().includes(value.toLowerCase()))
          if (usersFind.length>0){
              setStaffToAdmin(usersFind)
              
          }else{
              setMessageError('Utilisateur non trouvé')
              setStaffToAdmin()
          }
        }else{
          setStaffToAdmin();
        }
      };
      const addStaff=(e)=>{
        let tmpStaff = allStaff.find(el=>el.user._id ===e.target.value)
        if(tmpStaff){
          setMessageError(`${tmpStaff.user.firstName} ${tmpStaff.user.lastName} est déja membre du bureau`)
        }else{
          const user = e.target.value;
          const grade = "Membre";
         reqBearer.post(`/staff`,{user, grade})
        .then(()=>
        {
         getAllStaff()
        }) 
      }
  }

      const columns = [
        {
          title: 'Membre',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
        },
        {
          title: 'BUREAU',
          dataIndex: 'ca',
          key: 'ca',
        }
      ];



      const getDataSource=()=>{
      
        const dataSource=[];
        if (allStaff){
          for (let staff of allStaff){
            let isCa=staff.ca?true:false
            dataSource.push({
              key:staff._id,
              name:  `${staff.user.lastName} ${staff.user.firstName}`,
              role: `${staff.grade}`,
              ca:isCa?"X":""
                })
            }}
          return dataSource
      }
      const selectAdmin=(record)=>{
        if(isAdminStaff){
          reqBearer.get(`/staff/${record.key}`)
          .then((res)=>{
            setStaff(res.data)
            setIsModalVisible('true')
          })
         
      }else{
        alert("Vous n'avez pas les droits pour effectuer ces opérations")
      }
    }


    return (
        <div className='staffList'> 
         
          <h4>Gestion des membres du bureau</h4> 
          <div className='backDashboard' onClick={back}>
            <img src="../assets/icones/dashboardColor.png" alt='tableau de bord'/>
            Retour
          </div> 
            <div className='adminRights-head'>
           {isAdminStaff&&
            <Space direction="vertical">
            Ajouter un membre: 
    <Search
      placeholder="nom ou prenom"
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
    </Space>
    } 
      
    </div>
    {messageError&&
    <div className='message-error'>{messageError}</div>
  }
  {staffToAdmin&&
    <div className='userToAdmin'>
       {
         staffToAdmin.map((user)=>  
          <div key={user._id} className="userToAdmin__user" >
                    <div className='userToAdmin__id' value={user._id}>{user.lastName} {user.firstName}</div>
                    <button value={user._id}onClick={addStaff}>Intégrer au bureau</button>
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
         {staff&&
  <UpdateStaff
    staff={staff} 
    setStaff={setStaff}
    isModalVisible={isModalVisible}
    setIsModalVisible={setIsModalVisible}
    />}
        </div>
    );
};

export default StaffList;