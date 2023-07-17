import React from 'react';
import { useContext, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Modal, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { articlesContext } from '../../context/ArticlesContext';
import UpdateArticle from '../../components/admin/UpdateArticle';
import { authContext } from '../../context/AuthContext';

const ArticlesPage = () => {

    const { reqBearer } = useContext(authContext)
    const { getArticlesList, articlesList, editArticle, setEditArticle, getEditArticle, addArticleDoc, getAddArticleDoc} = useContext(articlesContext);

    const [isModalArticleDocumentVisible, setIsModalArticleDocumentVisible]=useState(false);
    const [selectedArticle, setSelectedArticle]=useState('');
    const [document, setDocument]=useState('');

    const headers = 'Content-Type : multipart/form-data';

    const handleCancel = () => {
        setIsModalArticleDocumentVisible(false);
        setSelectedArticle('');
    };

    const selectArticle= (article) =>{
        setIsModalArticleDocumentVisible(true);
        setSelectedArticle(articlesList.find((art)=>art._id === article._id))
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish = () =>{
        const form = new FormData()
        form.append('articleDoc', document);
        reqBearer.put(`/article/doc/${selectedArticle._id}`, form, headers)
           .then(()=>{
               getArticlesList()
               handleCancel()
       })
       .catch((error)=>{console.log(error)}) 
    }

    const normFile = (e)=>{
        setDocument(e.file?e.file:selectedArticle.document)
    }

    const deleteDocument = ()=>{
        reqBearer.put(`/article/doc/delete/${selectedArticle._id}`)
        .then(()=>{
            getArticlesList()
            handleCancel()
    })
    .catch((error)=>{console.log(error)}) 
    }
    return (
        <div className='pageArticles'>
            <div className='backDashboard'>
                {editArticle
                ? <div onClick={()=>{setEditArticle(false)}}><img src="../assets/icones/dashboardColor.png" alt='tableau de bord'/>Retour</div>
                :<NavLink to={'/management'}><img src="../assets/icones/dashboardColor.png" alt='tableau de bord'/>Retour</NavLink>
                }
            </div> 
            <h4>Liste des articles</h4>
            {articlesList&&
            <div className='pageArticles__liste'>
                {editArticle
                    ?
                   <UpdateArticle />
                    :
                    <div className='listArticles'>
                        {articlesList.map((article)=>(
                            <div key={article._id} className='adminArticle'>
                                <div className='adminArticle__content'>
                                        {article.imageUrl&&
                                            <img alt={article.title} src={article.imageUrl}/>
                                        }
                                        <p>{article.title}</p>
                                        <p>{article.content[0]}...</p>
                                        {article.document&& <p>Document: {article.document.split('http://localhost:3001/articleDoc/')}</p>}
                                    </div>
                                    <div className='adminArticle__settings'>
                                        <button data-id={article._id} type='button'className='adminArticle__settings adminArticle__settings--ligne' title='Modifier' onClick={()=>{getEditArticle(article)}} ><img data-id={article._id} alt='edit' src="../assets/icones/edit.png"/></button>
                                        <button data-id={article._id} type='button'className='adminArticle__settings adminArticle__settings--ligne' title='Ajouter un document' onClick={()=>{selectArticle(article)}}><img data-id={article._id} alt='ajouter un document' src="../assets/icones/document.png"/></button>
                                        <button data-id={article._id} type='button'className='adminArticle__settings adminArticle__settings--ligne' title='Ajouter un lien' onClick={()=>{selectArticle(article)}}><img data-id={article._id} alt='ajouter un lien' src="../assets/icones/lien.png"/></button>
                                        <button data-id={article._id} type='button'className='adminArticle__settings' title='Supprimer'><img alt='supprimer' src="../assets/icones/poubelle.png"/></button>
                                    </div>
                                    <Modal
                                        title="Ajouter un document" 
                                        visible={isModalArticleDocumentVisible} 
                                        destroyOnClose={true}
                                        onCancel={handleCancel}
                                            footer={[
                                                <Button type="primary" key='valid' onClick={onFinish}>Valider</Button>,
                                                <Button key="back" onClick={handleCancel}>Annuler</Button>
                                                ]}
                                            >      
                                            {selectedArticle&&
                                            <div>
                                                {selectedArticle.document
                                                    ?<div>
                                                       <div className='documentArticle'>
                                                    <Form
                                                    onFinish={onFinish}
                                                    onFinishFailed={onFinishFailed}
                                                    className='updateArticleForm'
                                                    >
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
                                                                <Button icon={<UploadOutlined />}>Modifier le document</Button>
                                                            </Upload>
                                                        </Form.Item> 
                                                    </Form>
                                                </div> 
                                                <Button onClick={deleteDocument}>Supprimer le document</Button>
                                                    </div>
                                                  
                                                  :<div className='documentArticle'>
                                                    <Form
                                                    onFinish={onFinish}
                                                    onFinishFailed={onFinishFailed}
                                                    className='updateArticleForm'
                                                    >
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
                                                                <Button icon={<UploadOutlined />}>Choisir un document</Button>
                                                            </Upload>
                                                        </Form.Item> 
                                                    </Form>
                                                </div>}</div>}
                                        </Modal>
                            </div>
                        ))
                        }
                    </div>
                    }
              </div>  
            }
               
        </div>
    );
};

export default ArticlesPage;