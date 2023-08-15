import React from 'react';
import { useContext, useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Modal, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { articlesContext } from '../../context/ArticlesContext';
import UpdateArticle from '../../components/admin/UpdateArticle';
import { authContext } from '../../context/AuthContext';
import TextArea from 'antd/lib/input/TextArea';

const ArticlesPage = () => {

    const { reqBearer } = useContext(authContext)
    const { getArticlesList, articlesList, editArticle, setEditArticle, getEditArticle} = useContext(articlesContext);

    const [isModalArticleDocumentVisible, setIsModalArticleDocumentVisible]=useState(false);
    const [isModalArticleLienVisible, setIsModalArticleLienVisible]=useState(false);
    const [isModalArticleDeleteVisible, setIsModalArticleDeleteVisible]=useState(false);
    const [selectedArticle, setSelectedArticle]=useState('');
    const [document, setDocument]=useState('');
    const [lien, setLien]=useState('');

    const headers = 'Content-Type : multipart/form-data';

    useEffect(()=>{
        getArticlesList()
      },[])    

    const handleCancel = () => {
        setIsModalArticleDocumentVisible&& setIsModalArticleDocumentVisible(false);
        setIsModalArticleLienVisible&& setIsModalArticleLienVisible(false);
        setIsModalArticleDeleteVisible&& setIsModalArticleDeleteVisible(false);
        setSelectedArticle('');
    };

    const selectArticle= (article) =>{
        setSelectedArticle(articlesList.find((art)=>art._id === article._id))
    }

    const editDocArticle = (article)=>{
        setIsModalArticleDocumentVisible(true);
        selectArticle(article)
    }
    const editLienArticle = (article)=>{
        setIsModalArticleLienVisible(true);
        selectArticle(article)
    }

    const deleteArticle = (article)=>{
        selectArticle(article)
        setIsModalArticleDeleteVisible(true)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinishDoc = () =>{
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
    const editLien = (e) =>{
        e.target.value.length===0?setLien(''):setLien(e.target.value) 
    }
    const onFinishLien=()=>{
        console.log(lien)
        reqBearer.put(`/article/lien/${selectedArticle._id}`, { lien })
        .then(()=>{
            getArticlesList()
            handleCancel()
            setLien('')
    })
    .catch((error)=>{console.log(error)}) 
    }
    const deleteLien=()=>{
        setLien('')
        reqBearer.put(`/article/lien/${selectedArticle._id}`, { lien })
        .then(()=>{
            getArticlesList()
            handleCancel()
    })
    .catch((error)=>{console.log(error)}) 
    }

    const onFinishDelete=()=>{
        reqBearer.delete(`/article/${selectedArticle._id}`)
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
                                        {article.lien&& <a href={article.lien} target='blank'>lien</a>}
                                        {article.visibility&& <p style={{color: 'red'}}>Cet article visible par tous</p>}
                                    </div>
                                    <div className='adminArticle__settings'>
                                        <button data-id={article._id} type='button'className='adminArticle__settings adminArticle__settings--ligne' title='Modifier' onClick={()=>{getEditArticle(article)}} ><img data-id={article._id} alt='edit' src="../assets/icones/edit.png"/></button>
                                        <button data-id={article._id} type='button'className='adminArticle__settings adminArticle__settings--ligne' title='Ajouter un document' onClick={()=>{editDocArticle(article)}}><img data-id={article._id} alt='ajouter un document' src="../assets/icones/document.png"/></button>
                                        <button data-id={article._id} type='button'className='adminArticle__settings adminArticle__settings--ligne' title='Ajouter un lien' onClick={()=>{editLienArticle(article)}}><img data-id={article._id} alt='ajouter un lien' src="../assets/icones/lien.png"/></button>
                                        <button data-id={article._id} type='button'className='adminArticle__settings' title='Supprimer' onClick={()=>deleteArticle(article)}><img alt='supprimer' src="../assets/icones/poubelle.png"/></button>
                                    </div>
{/* --------------------------------------------------MODAL AJOUT DOC------------------------------------------------------- */}
                                    <Modal
                                        title="Ajouter un document" 
                                        visible={isModalArticleDocumentVisible} 
                                        destroyOnClose={true}
                                        onCancel={handleCancel}
                                            footer={[
                                                <Button type="primary" key='valid' onClick={onFinishDoc}>Valider</Button>,
                                                <Button key="back" onClick={handleCancel}>Annuler</Button>
                                                ]}
                                            >      
                                            {selectedArticle&&
                                            <div>
                                                {selectedArticle.document
                                                    ?<div>
                                                       <div className='documentArticle'>
                                                    <Form
                                                    onFinish={onFinishDoc}
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
                                                    onFinish={onFinishDoc}
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
                                                </div>}
                                            </div>}
                                        </Modal>
{/* --------------------------------------------------MODAL AJOUT LIEN------------------------------------------------------- */}
                                        <Modal
                                        title="Ajouter un lien" 
                                        visible={isModalArticleLienVisible} 
                                        destroyOnClose={true}
                                        onCancel={handleCancel}
                                            footer={[
                                                <Button type="primary" key='valid' onClick={onFinishLien}>{selectedArticle.lien?'Modifier':'Valider'}</Button>,
                                                <Button key="back" onClick={handleCancel}>Annuler</Button>
                                                ]}
                                            >      
                                                {selectedArticle&&
                                                <div className='lienArticle'>
                                                        <Form.Item  onChange={editLien}  >
                                                            <TextArea defaultValue={selectedArticle.lien?selectedArticle.lien:''} rows={2} placeholder='lien'></TextArea>
                                                        </Form.Item> 
                                                        {selectedArticle.lien&&<div className='deleteButton'><Button onClick={deleteLien}>Supprimer</Button></div>}
                                                </div>}
                                            </Modal>
{/* --------------------------------------------------MODAL SUPPRESSION ARTICLE------------------------------------------------------- */}
                                            <Modal
                                            title="Supprimer cet article" 
                                            visible={isModalArticleDeleteVisible} 
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