import React, { useState } from 'react';
import { useContext } from 'react';
import { authContext } from '../../context/AuthContext';
import {Button, Form, Input, DatePicker, TimePicker } from "antd";
import TextArea from 'antd/lib/input/TextArea';
import {  DeleteOutlined } from '@ant-design/icons';
import { eventContext } from '../../context/EventContext';


const AdminCreateEvent = ({ setIsModalEventVisible }) => {

    const { reqBearer } = useContext(authContext);

    const { getEventList }=useContext(eventContext)
    
    const txtRegexp = new RegExp(/^[a-z0-9\séèçêëàâùûîïô%°'-,.":{}!?@;/()]{3,2000}$/i);

    const [content, setContent]=useState([]);
    const [newParagraphe, setNewParagraphe]=useState(false);
    const [paragraphe, setParagraphe]=useState("")
    const [title, setTitle]=useState("");
    const [date, setDate]=useState("");
    const [day, setDay]=useState("");
    const [time, setTime]=useState("");
    const [place, setPlace]=useState("");
    const [messageError, setMessageError]=useState();

    const addNewParag=()=>{
        if(paragraphe.length>0){
            let foundParag = content.find((el)=>el=== paragraphe)
                if(!foundParag){
                    content.push(paragraphe)
                }
        }
       
        setNewParagraphe(false)
    }
    const checkParagraphe=(e)=>{
        setParagraphe(e.target.value)
    }

    const deleteParag=(e)=>{
        let i = e.currentTarget.getAttribute('data-index');
        content.splice(i, 1)
        e.currentTarget.parentNode.setAttribute('class', 'inputToDelete');
    }

    const onChangeDate = (date, dateString) => {
        setDay(dateString);

      };
    const onChangeTime = (time, timeString) => {
        setTime(timeString);
      };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
    const onFinish=()=>{
        let date =day+"T"+time
        const data ={
            title,
            content,
            date, 
            place
        }
       //console.log(data)
        reqBearer.post(`/agenda`, data)
        .then(()=>{
            setIsModalEventVisible(false)
            getEventList()
        })
        .catch((error)=>{
            error.response.data.error?
            setMessageError(error.response.data.error)
            :setMessageError("une erreur est survenue")        
        }) 
    }

    return (
        <div>
            <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
                <Form.Item
                name="title"
                onChange={(e)=>setTitle(e.target.value)}
                rules={[
                {
                    pattern: txtRegexp,
                    message:"Format invalide"
                }
                ]}
                >
                    <Input placeholder='titre' />
                </Form.Item>
               

                <br/>
                <Form.Item
                name="place"
                onChange={(e)=>setPlace(e.target.value)}
                rules={[
                    {
                        pattern: txtRegexp,
                        message:"Format invalide"
                    }
                ]}
                >
                    <Input placeholder='adresse' />
                </Form.Item>
                <DatePicker onChange={onChangeDate} />
                <TimePicker onChange={onChangeTime} />
            </Form> 
            {content.length>0
                ?
                    content.map((parag, index)=> 
                   
                    <div key={index} className="parag">
                        <Form>
                            <Form.Item initialValue={parag}>
                                <TextArea defaultValue={parag} rows={5} data-index={index}></TextArea>
                            </Form.Item>
                            <Button type='text' data-index={index} onClick={deleteParag} ><DeleteOutlined /></Button>
                        </Form>
                    </div>
                    
                   )
                    :""
                }
                {
                newParagraphe 
                ?<Form
                onFinish={addNewParag}
                >
                    <Form.Item 
                        name="parag"
                        onChange={checkParagraphe}
                        rules={[
                            {
                                pattern: txtRegexp,
                                message:"Format invalide"
                            }
                        ]}
                    >
                        <TextArea rows={5}/>
                    </Form.Item>
                    <Button onClick={addNewParag}>Ajouter</Button>
                </Form>
                :  <Button onClick={()=>setNewParagraphe(true)}>Ajouter un paragraphe</Button>
                }
               
        
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={onFinish}>
                Créer
            </Button>
            {messageError&& <div className="message-error">Erreur: {messageError}</div>}  
        </div>
    );
};

export default AdminCreateEvent;