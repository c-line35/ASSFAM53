import React, { useState, useContext } from 'react';
import {Button,Form, Input, Upload} from "antd";
import { UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { authContext } from '../../context/AuthContext';


const txtRegexp = new RegExp(/^[a-z0-9\séèçêëàù'\-,.":{}!?;]{1,2000}$/i);

const AdminCreateArticle = () => {

    const {  reqBearer } = useContext(authContext);

    const [image, setImage] = useState('');
    const [content, setContent]=useState([]);
    const [newParagraphe, setNewParagraphe]=useState(false);
    const [paragraphe, setParagraphe]=useState("")
    const [title, setTitle]=useState("");
    const [position, setPosition]=useState ("");

    const headers = 'Content-Type : multipart/form-data';

    const normFile = (e)=>{
        setImage(e.file?e.file:"")
    }

    const onFinish=()=>{
        const data ={
            title,
            content,
            position,
            document:false
        }
        console.log(data)
        const form = new FormData();
        form.append('image', image);
        form.append ('data', JSON.stringify(data))
        reqBearer.post(`/article`, form, headers)
        .then((data)=>console.log(data))
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

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

    const getTitle=(e)=>{
        setTitle(e.target.value)
    }
    const getPosition=(e)=>{
        setPosition(e.target.value)
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
                onChange={getTitle}
                rules={[
                {
                    pattern: txtRegexp,
                    message:"Format invalide"
                }
                ]}
                >
                    <Input placeholder='titre' />
                </Form.Item>
                <Form.Item
                        name="upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload 
                        name="image" 
                        listType="picture"  
                        maxCount = {1}
                        beforeUpload="false"
                        getValueFromEvent={normFile}
                    >
                        <Button icon={<UploadOutlined />}>Télécharger une image</Button>
                           <div>La taille de la photo ne doit pas dépasser 2Mo</div>  
                           <a href='https://www.resizepixel.com/fr' alt="réduire la taille" rel="noreferrer" target="_blank">réduire la taille</a>                  
                        </Upload>
                    </Form.Item> 
                <Form.Item
                name="position"
                onChange={getPosition}
                rules={[
                {
                    pattern: txtRegexp,
                    message:"Format invalide"
                }
                ]}
                >
                    <Input placeholder='position' />
                </Form.Item>
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
                    <Form.Item onChange={checkParagraphe}>
                        <TextArea rows={5}/>
                    </Form.Item>
                    <Button onClick={addNewParag}>Ajouter</Button>
                </Form>
                :  <Button onClick={()=>setNewParagraphe(true)}>Ajouter un paragraphe</Button>
                }
               
        
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={onFinish}>
                Créer
            </Button>
        </div>
    );
};

export default AdminCreateArticle;