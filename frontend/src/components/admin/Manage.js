import React from 'react';
import AdminArticles from './AdminArticles';
import AdminBooks from './AdminBooks';
import AdminIntro from './AdminIntro';
import AdminStaff from './AdminStaff';
import AdminUsers from './AdminUsers';


const Manage = () => {


    return (
        <div>
            <div className='dashboard'>
                <div className='dashboard__bloc dashboard__bloc--intro'><AdminIntro/></div>
                <div className='dashboard__bloc dashboard__bloc--users'><AdminUsers/></div>
                <div className='dashboard__bloc dashboard__bloc--staff'><AdminStaff/></div>
                <div className='dashboard__bloc dashboard__bloc--books'><AdminBooks/></div>
                <div className='dashboard__bloc dashboard__bloc--articles'><AdminArticles/></div>
                <div className='dashboard__bloc dashboard__bloc--logo'><img src='./assets/logos/logo.png' alt='assfam53'/></div>

            </div>
        </div>
    );
};

export default Manage;