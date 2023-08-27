import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { authContext } from './AuthContext';

 export const eventContext = React.createContext({
        eventListe:[],
        getEventList:()=>{},
        editEvent:(''),
        getEditEvent:()=>{},
        id:(''),
        setId:()=>{}
    })

const EventContext = ({ children }) => {

    const { reqInstance }=useContext(authContext);

    const [eventList, setEventList]=useState([]);
    const [id, setId]=useState();
    const [editEvent, setEditEvent]=useState();

    const getEventList=()=>{
        reqInstance.get("/agenda")
        .then((res)=>{
            setEventList(res.data.sort((a,b)=>a.date>b.date? 1:-1))
        })
    }
    const getEditEvent=()=>{
        reqInstance.get(`/agenda/:${id}`)
        .then((res)=>{
            setEditEvent(res.data)
        })
    }

    useEffect(()=>{
        getEventList()
    }, [])
    

    return (
         <eventContext.Provider value={ { 
            eventList, getEventList,
            editEvent, getEditEvent,
            id, setId
          } }>
            { children }
       </eventContext.Provider>
    );
};

export default EventContext;