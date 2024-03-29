import React, { useState } from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { eventContext } from '../../context/EventContext';
import { useEffect } from 'react';
import UpdateEvent from '../../components/admin/UpdateEvent';
import { authContext } from '../../context/AuthContext';
import { Button, Modal } from 'antd';

const EventsPage = () => {

    const { reqBearer } = useContext(authContext)

    const { getEventList, eventList, setEditEvent, getEditEvent, editEvent} = useContext(eventContext);
    
    const [isModalEditEventVisible, setIsModalEditEventVisible]=useState(false);
    const [isModalEventDeleteVisible, setIsModalEventDeleteVisible]=useState(false);
    const [tmpParag, setTmpParag]=useState(editEvent ?editEvent.content: '');
    const [eventToDelete, setEventToDelete]=useState('');
   
    useEffect(()=>{
        getEventList()
      },[])    

    const dateFormater = (date) =>{
        let newdate = new Date(date).toLocaleDateString('fr-FR', {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: 'numeric'
        })
        return newdate
    }

    const handleCancel = () => {
        setIsModalEventDeleteVisible&& setIsModalEventDeleteVisible(false);
        getEventList();
    };

    const onFinishDelete=()=>{
        let id=eventToDelete._id
        reqBearer.delete(`/agenda/${id}`)
        .then(()=>handleCancel())
        .catch((error)=>console.log(error))
    }
 
    const eventEditing=(event)=>{
        setIsModalEditEventVisible(true)
        getEditEvent(event)
        setTmpParag(event.content)
    }

    const deleteEvent=(event)=>{
        setIsModalEventDeleteVisible('true')
        setEventToDelete(event)
    }

    return (
        <div className='pageArticles'>
        <div className='backDashboard'>
            {editEvent
            ? <div onClick={()=>{setEditEvent(false)}}><img src="../assets/icones/dashboardColor.png" alt='tableau de bord'/>Retour</div>
            :<NavLink to={'/management'}><img src="../assets/icones/dashboardColor.png" alt='tableau de bord'/>Retour</NavLink>
            }
        </div> 
        <h4>Liste des évènements   </h4>
        {eventList&&
                 
                <div className='listArticles'>
                    {eventList.map((event)=>(
                        <div key={event._id} className='adminArticle'>
                            <div className='adminArticle__content'>
                                <p>{event.title}</p>
                                <p>{event.content[0]}...</p>
                                <p>Date: {dateFormater(event.date)}</p>
                                <p>Lieu: {event.place}</p>
                            </div>
                            <div className='adminArticle__settings'>
                                <button data-id={event._id} type='button'className='adminArticle__settings adminArticle__settings--ligne' title='Modifier' onClick={()=>{eventEditing(event)}} ><img data-id={event._id} alt='edit' src="../assets/icones/edit.png"/></button>
                                <button data-id={event._id} type='button'className='adminArticle__settings' title='Supprimer' onClick={()=>deleteEvent(event)}><img alt='supprimer' src="../assets/icones/poubelle.png"/></button>
                            </div>
                        </div>)
                    )}
                </div>
        
           
        }
        {editEvent&&
        <UpdateEvent 
            isModalEditEventVisible={ isModalEditEventVisible }
            setIsModalEditEventVisible={ setIsModalEditEventVisible}
            tmpParag={tmpParag}
            setTmpParag={setTmpParag}
        />
         }
{/* ------------------------------------------MODAL SUPPRESSION EVENT-------------------- */}    
        <Modal
            title="Supprimer cet évènement" 
            visible={isModalEventDeleteVisible} 
            destroyOnClose={true}
            onCancel={handleCancel}
            footer={[
                <Button type="primary" key='valid' onClick={onFinishDelete}>Supprimer</Button>,
                <Button key="back" onClick={handleCancel}>Annuler</Button>
                     ]}
        >      
            <div>Etes-vous sûr de vouloir supprimer cet article?</div>
        </Modal>
</div>
)};

export default EventsPage;