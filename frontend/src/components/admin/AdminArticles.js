import React, { useContext, useState } from 'react';
import { Button, Modal } from 'antd';
import { authContext } from '../../context/AuthContext';
import AdminCreateArticle from './AdminCreateArticle';
import { NavLink } from 'react-router-dom'
import AdminCreateEvent from './AdminCreateEvent';

const AdminArticles = () => {

    const [isModalArticleVisible, setIsModalArticleVisible] = useState(false);
    const [isModalEventVisible, setIsModalEventVisible] = useState(false);

 
    const { isAdminArticle }=useContext(authContext);

    const handleCancel = () => {
        setIsModalArticleVisible(false);
        setIsModalEventVisible(false);

    };
    
    return (
        <div>
            <h3>Articles à la une / Agenda</h3>
            {isAdminArticle&& 
            <>
                <button className='button1' onClick={()=>setIsModalArticleVisible(true)} >Créer un nouvel article</button> 
                <button className='button1' ><NavLink to="/adminarticles">Voir tous les articles</NavLink></button> 
                <button className='button1' onClick={()=>setIsModalEventVisible(true)}>Créer un nouvel évènement</button>
                <button className='button1' ><NavLink to="/adminevent">Voir tous les évènements</NavLink></button>
            </>
            }  
            <Modal
               title="Nouvel article" 
               visible={isModalArticleVisible} 
               destroyOnClose={true}
               onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Fermer
                    </Button>,
                    ]}
                >
                <AdminCreateArticle setIsModalArticleVisible={setIsModalArticleVisible} />
            </Modal>
           
            <Modal
               title="Nouvel Evenement" 
               visible={isModalEventVisible} 
               destroyOnClose={true}
               onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Fermer
                    </Button>,
                    ]}
                >
                    <AdminCreateEvent setIsModalEventVisible={setIsModalEventVisible} />
            </Modal>
        </div>
    );
};

export default AdminArticles;