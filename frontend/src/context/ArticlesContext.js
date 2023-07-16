import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { authContext } from './AuthContext';


export const articlesContext = React.createContext({
    articlesList:[''],
    getArticlesList:()=>{},
    editArticle:(''),
    setEditArticle:()=>{}, 
    getEditArticle:()=>{},
    addArticleDoc:()=>{},
    setAddArticleDoc:()=>{},
    getAddArticleDoc:()=>{}
})

const ArticlesContextProvider = ({ children }) => {

const { reqInstance }=useContext(authContext)

const [articlesList, setArticlesList]=useState("");
const [editArticle, setEditArticle]=useState('');
const [addArticleDoc, setAddArticleDoc]=useState('')

const getArticlesList=()=>{
    reqInstance.get("/article")
    .then((res)=>setArticlesList(res.data))
}

useEffect(()=>{getArticlesList()}, [])

const getEditArticle=(articleToEdit)=>{
    setEditArticle(articlesList.find((art)=>art._id === articleToEdit._id))
    
}

const getAddArticleDoc=(article)=>{
    console.log(article)
}


    return (
       <articlesContext.Provider value={{
        articlesList, getArticlesList,
        editArticle, setEditArticle,getEditArticle, 
        addArticleDoc, setAddArticleDoc, getAddArticleDoc
        }}>
            { children }
       </articlesContext.Provider>
    );
};

export default ArticlesContextProvider;