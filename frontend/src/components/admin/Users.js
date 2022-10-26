import React, { useContext, useState } from 'react';
import User from './User';
import { Radio, Collapse, Space } from 'antd';
import { usersContext } from '../../context/UsersContext';

const { Panel} = Collapse

const arrayDate=(year)=>{
  let arrayDate=[]
  let y = 2018
  while(y< year + 1){
    y++
    arrayDate.push(y)
  }
  return(arrayDate)
}

const Users = () => {
  
  const { setShowUsers, year, users, usersOfYear } = useContext(usersContext);
  const [filteredArr, setfilteredArr]=useState(usersOfYear)
  const [allUsers, setAllUsers]=useState(users)
  const [dateFilter, setFilterDate]=useState(2022)


  
  const getShowUsers=()=>{
    setShowUsers(false)
  }

  const getfilterDate = (e) => {
setFilterDate(e.target.value)
const newArray = allUsers.filter((el)=>el.end.includes(e.target.value))
setfilteredArr(newArray) 
  };

  
  const arrayOfDates=arrayDate(year);
    
  const getSearch =(e)=>{
    const search = e.target.value.toLowerCase().replace(/\s/g, "");
    const filter=allUsers.filter(el=>
      el.end.includes(dateFilter)&&
      (el.lastName.toLowerCase().includes(search)||
      el.firstName.toLowerCase().includes(search)||
      `${el.lastName.toLowerCase() + el.firstName.toLowerCase()}`.replace(/\s/g, "").includes(search)||
      `${el.firstName.toLowerCase() + el.lastName.toLowerCase()}`.replace(/\s/g, "").includes(search)))
    setfilteredArr(filter)
  }

  return (
    <>
      <h1>LISTE DES ADHERENTS</h1>

      <div className='searchBar'>
        <div className='input-control'>
          <img src='./assets/icones/zoom.png' alt='recherche'/>
          <input  placeholder='Rechercher' onChange={getSearch} ></input>
        </div>
        <div className='backDashboard' onClick={getShowUsers}>
          <img src="./assets/icones/dashboard.png" alt='tableau de bord'/>
          Retour
        </div> 
      </div>

      <div className='mainContentUsers'>
        <div className='filter'>
          <p className="filter__title"><img src="./assets/icones/filter.png" alt='filtres'/>Filtres</p>
          <Collapse>
          <Panel header="Année" key="1">
            <Radio.Group onChange={getfilterDate}>
              <Space direction='vertical'>
              {arrayOfDates.map((dates)=><Radio key={dates} value={dates}>{dates}</Radio>)}
              </Space>
            </Radio.Group> 
            </Panel>
          </Collapse>
          <p> {filteredArr.length} adhérents correspondent à votre recherche</p>
        </div>
        <section className='users'>
          <div className=" userTableTitle">
            <span className='userTableTitle__bar'>Nom, Prénom</span>
            <span className='userTableTitle__bar'>Email</span>
            <span className='userTableTitle__bar'>Téléphone</span>
            <span className='userTableTitle__bar'>Adhésion</span>
          </div>
           {filteredArr
            .sort((a,b)=>a.lastName.toLowerCase()>b.lastName.toLowerCase()? 1:-1)
            .map((user)=>(<User key={user.id} user={user}/>))
           }
        </section> 
      </div>
    </>
  );
};

export default Users;