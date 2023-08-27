import React from 'react';
import { useContext } from 'react';
import { eventContext } from '../context/EventContext';
import { useEffect } from 'react';
import { authContext } from '../context/AuthContext';

const Events = () => {

    const { getEventList, eventList }=useContext(eventContext);
    const { isAuthenticate }=useContext(authContext)

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

    useEffect(()=>{
        getEventList()
    }, [])
    
    return (
        <div className='events'>
            <div className='events__title'>Prochains évènements</div>
                <div className='events__content'>
                {
                    eventList&&
                    eventList.map((events, id )=>(
                        <div className='events__content__item' key={id}>
                            <h4>{events.title}</h4>
                            {
                                events.content&&
                                events.content.map((parag, index)=>(
                                    <p key={index}>{parag}</p>
                                ))
                            }
                            {isAuthenticate&&
                            <div>
                            <p><img src='./assets/icones/calendrier.png' alt='calendrier'/>{dateFormater(events.date)}</p>
                            <p><img src='./assets/icones/place.png' alt='localisation'/> {events.place}</p>
                            </div>}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Events;