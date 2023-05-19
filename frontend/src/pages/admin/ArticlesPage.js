import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { articlesContext } from '../../context/ArticlesContext';
import UpdateArticle from '../../components/admin/UpdateArticle';

const ArticlesPage = () => {

    const { articlesList, editArticle, getEditArticle} = useContext(articlesContext);

    return (
        <div className='pageArticles'>
            <div className='backDashboard'>
                <NavLink to={'/management'}><img src="../assets/icones/dashboardColor.png" alt='tableau de bord'/>Retour</NavLink>
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
                                    </div>
                                    <div className='adminArticle__settings'>
                                        <button data-id={article._id} type='button'className='adminArticle__settings adminArticle__settings--first' onClick={()=>{getEditArticle(article)}} ><img data-id={article._id} alt='edit' src="../assets/icones/edit.png"/></button>
                                        <button><img alt='supprimer' src="../assets/icones/poubelle.png"/></button>
                                    </div>
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