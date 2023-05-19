import React, {useState, useEffect, useContext} from 'react';
import {Button, Form, Input, Upload} from "antd";
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { authContext } from '../../context/AuthContext';
import { articlesContext } from '../../context/ArticlesContext';

const UpdateArticle = () => {

    const { reqBearer } = useContext(authContext)
    const { getArticlesList, editArticle, setEditArticle}= useContext(articlesContext);
    const headers = 'Content-Type : multipart/form-data';

    const [image, setImage]=useState('');
    const [title, setTitle]=useState('');
    const [newParag, setNewParag]=useState('');
    const [tmpParag, setTmpParag]=useState(editArticle.content);

    const [seeAddParag, setSeeAddParag]=useState(false);
    const [messageError, setMessageError]=useState();
    
    const onFinish =()=>{
       const titleLenght =Object.keys(title).length;
       const data={
        title: titleLenght===0?editArticle.title:title,
        content: tmpParag
       }
       const form = new FormData()
       form.append('image', image);
       form.append('data', JSON.stringify(data))
      
       reqBearer.put(`/article/${editArticle._id}`, form, headers)
           .then(()=>{
               getArticlesList()
               setEditArticle('')
               setMessageError('')
               setTmpParag('')
       })
       .catch((error)=>{
           error.response.data.error?
           setMessageError(error.response.data.error)
           :setMessageError("une erreur est survenue, vérifier la taille de votre fichier")        
       }) 
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e)=>{
            setImage(e.file?e.file:editArticle.imageUrl)
           
    }

    const updateTitle=(e)=>{
        setTitle(e?e.target.value:editArticle.tilte);
    };

    const addParag=()=>{
        if(newParag.length>0){
            let foundEl = tmpParag.find((el)=>el === newParag)
            if(!foundEl){
                tmpParag.push(newParag)
            }
        setSeeAddParag(false)}

    };

    const checkParag=(e)=>setNewParag(e.target.value);

    const deleteParag=(e)=>{
        let content = e.currentTarget.getAttribute('data-contenttext');
        setTmpParag(tmpParag.filter(el=>el!==content))
    }

    const editParag=(e)=>{
        let i = e.target.getAttribute('data-index');
        tmpParag.splice(i, 1, e.target.value)
    } 
    
    const checkAddParag=()=>setSeeAddParag(true)

    return (
        <div>
            <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className='updateArticleForm'
            >
                <Form.Item
                label="TITRE"
                initialValue={editArticle.title}
                name="lastName"                         
                onChange ={updateTitle}
                >
                    <Input/>
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
                    >
                        <Button icon={<UploadOutlined />}>Modifier l'image</Button>
                           <div>La taille de la photo ne doit pas dépasser 2Mo</div>  
                           <a href='https://www.resizepixel.com/fr' alt="réduire la taille" rel="noreferrer" target="_blank">réduire la taille</a>                  
                    </Upload>
                </Form.Item> 
            </Form>
            {tmpParag&& 
            tmpParag.map((p, index)=>
                <div key={index} className="updateMission">
                    <Form
                    className='updateArticleForm'
                    >
                        <div className='checkMission'>
                            <Form.Item  onChange={editParag}  >
                                <TextArea defaultValue={p} value={p} rows={5}></TextArea>
                            </Form.Item> 
                            <Button type='text' data-contenttext={p} onClick={deleteParag} ><DeleteOutlined /></Button>
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
                        <div className='modifyStaff'>
                            <Button key="submit" type="primary" onClick={onFinish} >Enregistrer les modifications</Button>
                        </div>
                        <Button>Valider</Button>
                        <Button onClick={()=>setEditArticle('')}>Annuler</Button>
                        {messageError&& <div className="message-error">Erreur: {messageError}</div>}  
                    </div>
    );
};

export default UpdateArticle;