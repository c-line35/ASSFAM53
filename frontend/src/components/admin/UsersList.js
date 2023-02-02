import React, { useContext, useState, useRef } from 'react';
import User from '../../components/admin/User';
import { Space, Button, Table, Input, Radio, Collapse} from 'antd';
import { usersContext } from '../../context/UsersContext';
import { authContext } from '../../context/AuthContext';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { staffContext } from '../../context/StaffContext';



const { Panel} = Collapse

const UsersList = () => {
  const { users, year,  setAfficheDashboard, setAfficheUsers, getArrayDate, setFilterDate, getAllUsers } = useContext(usersContext);
  const { getAllStaff }= useContext(staffContext);
const { reqBearer, isAdminUser } = useContext(authContext)
const [isModalVisible, setIsModalVisible] = useState(false);
 const [user, setUser]=useState();
 const [messageError, setMessageError]=useState([]);

const back=()=>{
  setFilterDate(year)
 setAfficheDashboard(true)
 setAfficheUsers(false)
}
const getLastYear=(user)=>{
 return Math.max.apply(null, user.end)
}
const getDataSource=()=>{
  const dataSource=[];
  for (let user of users){
    dataSource.push( {
      key: user._id,
      name: `${user.lastName.toUpperCase()} ${user.firstName} ${user.role ==="admin"? "***":" "}`,
        level: user.level,
        end: getLastYear(user),
        renouv:`${getLastYear(user)!==(year+1)?"X":""}`
      });
    }
    return dataSource;
}


  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    if(isAdminUser){
    setSelectedRowKeys(newSelectedRowKeys);
    setMessageError("");
  }else{
    alert("Vous n'avez pas les droits pour effectuer ces opérations")
  }
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [

      {
        key: 'thisYear',
        text: `inscription pour ${year}`,
        onSelect: () => {
          let arrayError=[];
          if(window.confirm(`Vous êtes sur le point de renouveler l'adhésion pour l'année ${year} pour les adhérents sélectionnés`  )) {
            let newYear = year;
            for(let id of selectedRowKeys ){
              reqBearer.put(`auth/user/update/${id}/end`,{newYear})
                .then(()=>setSelectedRowKeys([]))
                .catch((error)=>{
                  if(error.response){
                    arrayError.push(error.response.data.message)
                    setSelectedRowKeys([])
                  }
                })
              }
            setMessageError(arrayError)
            getAllUsers()
            }
        },
      },
      {
        key: 'nextYear',
        text: `inscription pour ${year+1}`,
        onSelect: () => {
          let arrayError=[];
          if(window.confirm(`Vous êtes sur le point de renouveler l'adhésion pour l'année ${year+1} pour les adhérents sélectionnés`  )) {
            let newYear = year+1;
            for(let id of selectedRowKeys ){
              reqBearer.put(`auth/user/update/${id}/end`,{newYear})
                .then(()=>setSelectedRowKeys([]))
                .catch((error)=>{
                  if(error.response){
                    arrayError.push(error.response.data.message)
                    setSelectedRowKeys([])
                  }
                })
              }
            setMessageError(arrayError)
            getAllUsers()
            }
        },
      },
      {
        key: 'delete',
        text: 'supprimer',
        onSelect: () => {
          let arrayError=[];
          if(window.confirm(`Cette action supprimera définitivement les adhérents sélectionnés`)){
            for(let id of selectedRowKeys){
              reqBearer.delete(`auth/${id}`)
              .then(()=>{
                getAllUsers();
                getAllStaff();              
              })
              .catch((error)=>{
                if(error.response){
                  arrayError.push(error.response.data.message)
                  setSelectedRowKeys([])
                }
              })
            }
          setMessageError(arrayError)
          }
        },
      },
    ],
  };
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
      style={{
        padding: 8,
      }}
      onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
          />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
            >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
            >
            Reset
          </Button>
         
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
      style={{
        color: filtered ? '#1890ff' : undefined,
      }}
      />
      ),
      onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
        highlightStyle={{
          backgroundColor: '#ffc069',
          padding: 0,
        }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
        />
        ) : (
          text
          ),
        });
        let arrayDate=[];
        let y=2020;
        while(y< year+1){
          y++;
          arrayDate.push({text:y, value:y});
        }
      
        const columns = [
        
         {
           title: 'NOM Prénom',
           dataIndex: 'name',
           key: 'name',
           width: '50%',
           ...getColumnSearchProps('name'),
        },
       
         {
           title: 'Adhésion',
           dataIndex: 'level',
           key: 'level',
         },
         {
           title: 'Dernière année réglée',
           dataIndex: 'end',
           key: 'end',
         },
         {
          title: 'Renouvellement à faire',
          dataIndex: 'renouv',
          key: 'renouv',
        },
        ];
    
        const getfilterDate = (e) => {
          setFilterDate(e.target.value);
      }
     const selectUser=(record)=>{
      reqBearer.get(`/auth/idUser/${record.key}`)
        .then((res)=>
        {
          setUser(res.data)
          setIsModalVisible('true')
        })
     }

        return (
          <div className='users'>
      <h4>LISTE DES ADHERENTS</h4>
      {messageError&& 
        messageError.map((message)=>(<div className='message-error' key={message}>{message}</div>))
     }
      <div className="intro-users">
      <Collapse>
          <Panel header="Année" key="1">
            <Radio.Group onChange={getfilterDate}>
              <Space direction='vertical'>
              {getArrayDate().map((dates)=><Radio key={dates} value={dates}>{dates}</Radio>)}
              </Space>
            </Radio.Group> 
            </Panel>
          </Collapse>
          <div className='backDashboard' onClick={back}>
            <img src="../assets/icones/dashboardColor.png" alt='tableau de bord'/>
            Retour
          </div> 
      </div> 
          <p> {users.length} adhérents correspondent à votre recherche</p> 
         
        <Table  
        columns={columns} 
        dataSource={getDataSource()} 
        rowSelection={rowSelection} 
        pagination={false}
        onRow={(record, rowIndex)=>{
          return{
            onClick : event =>{selectUser(record)}
          }
        }}
        />
        {user&&
    <User 
    user={user} 
    setUser={setUser}
    isModalVisible={isModalVisible}
    setIsModalVisible={setIsModalVisible}
    />
    }
     

</div>



  );
}
export default UsersList;