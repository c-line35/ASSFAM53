import React from 'react';
import { Button, Modal, Form, Input, DatePicker, TimePicker} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import { useContext } from 'react';
import { authContext } from '../../context/AuthContext';
import { eventContext } from '../../context/EventContext';


const UpdateEvent = ({ isModalEditEventVisible, setIsModalEditEventVisible, tmpParag, setTmpParag }) => {

    const txtRegexp = new RegExp(/^[a-z0-9\séèçêëàâùûîïô%°'-,.":{}!?@;/()]{3,2000}$/i);


    const { getEventList, eventList, setEditEvent, getEditEvent, editEvent} = useContext(eventContext);
    const { reqBearer } = useContext(authContext);

    const [title, setTitle]=useState('');
    const [day, setDay]=useState('');
    const [time, setTime]=useState('');
    const [place, setPlace]=useState('');
    const [newParag, setNewParag]=useState('');
   
    const [seeAddParag, setSeeAddParag]=useState(false);
    const [messageError, setMessageError]=useState();
    const [selectedEvent, setSelectedEvent]=useState('');


    const handleCancel = () => {
        setIsModalEditEventVisible&& setIsModalEditEventVisible(false);
        getEventList()
        setSelectedEvent('');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const updateTitle=(e)=>{
        setTitle(e?e.target.value:editEvent.tilte);
    };

    const updatePlace=(e)=>{
        setPlace(e?e.target.value:editEvent.place);
    };

    const onChangeDate = (date, dateString) => {
        setDay(dateString);
      };

    const onChangeTime = (time, timeString) => {
        setTime(timeString);
      };

    const checkParag=(e)=>setNewParag(e.target.value);

    const deleteParag=(e)=>{
        let i = e.currentTarget.getAttribute('data-index');
        tmpParag.splice(i,1)
        e.currentTarget.parentNode.setAttribute('class', 'inputToDelete');
    }
;
    const editParag=(e)=>{
        let i = e.target.getAttribute('data-index');
        tmpParag.splice(i, 1, e.target.value)
    } ;
    
    const checkAddParag=()=>setSeeAddParag(true);

    const addParag=()=>{
        if(newParag.length>0){
            let foundEl = tmpParag.find((el)=>el === newParag)
            if(!foundEl){
                tmpParag.push(newParag)
            }
        setSeeAddParag(false)}
    };

    const checkDate=()=>{
        if(day && time) return day+"T"+time
        else return editEvent.date
    }
     
    const onFinish =()=>{
        const titleLenght =Object.keys(title).length;
        const data={
         title: titleLenght===0?editEvent.title:title,
         content: tmpParag,
         date : checkDate(),
         place: place
        }
       
        reqBearer.put(`/agenda/${editEvent._id}`, data)
            .then(()=>{
                getEventList()
                setEditEvent('')
                setMessageError('')
                setTmpParag('')
        })
        .catch((error)=>{
            error.response.data.error?
            setMessageError(error.response.data.error)
            :setMessageError("une erreur est survenue, vérifier la taille de votre fichier")        
        }) 
     };

    return (
        <div>
            <Modal
            title="Modifier l'évènement" 
            visible={isModalEditEventVisible} 
            destroyOnClose={true}
            onCancel={handleCancel}
                footer={[
                    <Button type="primary" key='valid' onClick={onFinish}>Valider</Button>,
                    <Button key="back" onClick={handleCancel}>Annuler</Button>
                 ]}
            >  
            <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className='updateEventForm'
            >
                <Form.Item
                label="TITRE"
                initialValue={editEvent.title}
                name="titre"                         
                onChange ={updateTitle}
                rules={[
                    {
                        pattern: txtRegexp,
                        message:"Format invalide"
                    }
                ]}
                >
                    <Input/>
                </Form.Item>

                <DatePicker onChange={onChangeDate} />
                <TimePicker onChange={onChangeTime} />

                <Form.Item
                label="LIEU"
                initialValue={editEvent.place}
                name="place"                         
                onChange ={updatePlace}
                rules={[
                    {
                        pattern: txtRegexp,
                        message:"Format invalide"
                    }
                ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
            {tmpParag&& 
            tmpParag.map((p, index)=>
                <div key={index} className="updateMission">
                    <Form
                    className='updateArticleForm'
                    >
                        <div className='checkMission'>
                            <Form.Item  
                            name='parag'
                            onChange={editParag}  
                            rules={[
                                {
                                    pattern: txtRegexp,
                                    message:"Format invalide"
                                }
                            ]}
                            >
                                <TextArea defaultValue={p} rows={5} data-index={index}></TextArea>
                            </Form.Item> 
                            <Button type='text' data-index={index} onClick={deleteParag} ><DeleteOutlined /></Button>
                        </div> 
                    </Form>
                </div>)}
                {seeAddParag
                    ?<Form
                    onFinish={addParag}
                    className='updateArticleForm'
                    >
                            <Form.Item onChange={checkParag}>
                                <div className='addMission'>
                                    <Input />
                                    <Button onClick={addParag}>+</Button>
                                </div>
                            </Form.Item>
                    </Form>
                    : <Form
                    className='updateArticleForm'
                    >
                           <Button onClick={checkAddParag} >Ajouter un paragraphe</Button>
                    </Form>
                } 
                {messageError&& <div className="message-error">Erreur: {messageError}</div>}   
        </Modal>
        </div>
    );
};

export default UpdateEvent;