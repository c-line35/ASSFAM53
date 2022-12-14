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

const Manage = () => {

const { authProfil }=useContext(authContext)
const { afficheDashBoard, afficheAdmins,  afficheUsers }=useContext(usersContext)


    return (
        <div>
          {authProfil.role === "admin"
            ?<div className='dashboard'>
              {afficheUsers&&
                <UsersList />
              }
              {afficheAdmins&&
                <AdminRights /> 
              }
              {afficheDashBoard &&
              <>
                <div className='dashboard__bloc dashboard__bloc--intro'><AdminIntro/></div>
                <div className='dashboard__bloc dashboard__bloc--users'><AdminUsers/></div>
                <div className='dashboard__bloc dashboard__bloc--staff'><AdminStaff/></div>
                <div className='dashboard__bloc dashboard__bloc--books'><AdminBooks/></div>
                <div className='dashboard__bloc dashboard__bloc--articles'><AdminArticles/></div>
                <div className='dashboard__bloc dashboard__bloc--logo'><NavLink to="/"><img src='./assets/logos/logo.png' alt='assfam53'/></NavLink></div>
              </>
              }
            </div>
          :<Auth />
        }
        </div>
    );
};

export default Manage;