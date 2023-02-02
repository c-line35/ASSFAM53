import React, { useContext } from 'react';
import { authContext } from '../../context/AuthContext';
import AdminArticles from '../../components/admin/AdminArticles';
import AdminBooks from '../../components/admin/AdminBooks';
import AdminIntro from '../../components/admin/AdminIntro';
import AdminStaff from '../../components/admin/AdminStaff';
import AdminUsers from '../../components/admin/AdminUsers';
import Auth from '../../components/Auth';
import UsersList from '../../components/admin/UsersList';
import AdminRights from '../../components/admin/AdminRights';
import { NavLink } from 'react-router-dom';
import { usersContext } from '../../context/UsersContext';
import { staffContext } from '../../context/StaffContext';
import StaffList from '../../components/admin/StaffList';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Manage = () => {

const { authProfil }=useContext(authContext);
const { afficheDashBoard, afficheAdmins,  afficheUsers }=useContext(usersContext)
const { afficheStaff }=useContext(staffContext);


    return (
        <div> 
          <Header/>
         
          
          {authProfil.role === "admin"
            ? <div className="dashboardMain">
            <h2>Tableau de bord Administrateur</h2>
            <div className='dashboard'>
             
              {afficheUsers&&
                <UsersList />
              }
              {afficheAdmins&&
                <AdminRights /> 
              }
              {
                afficheStaff&&
                <StaffList />
              }

              {afficheDashBoard &&
              <>
                 
                <div className='dashboard__bloc dashboard__bloc--users'><AdminUsers/></div>
                <div className='dashboard__bloc dashboard__bloc--staff'><AdminStaff/></div>
                <div className='dashboard__bloc dashboard__bloc--books'><AdminBooks/></div>
                <div className='dashboard__bloc dashboard__bloc--articles'><AdminArticles/></div>
              </>
              }
              </div> 
            </div> 
          :<Auth />
        }
        
        <Footer/>
        </div>
    );
};

export default Manage;