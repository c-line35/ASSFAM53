import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { authContext } from './AuthContext';


export const articlesContext = React.createContext({
    articlesList:[],
    getArticlesList:()=>{},
    editArticle:(''),
    setEditArticle:()=>{}, 
    getEditArticle:()=>{}
})

const ArticlesContextProvider = ({ children }) => {

const { reqInstance, isAuthenticate }=useContext(authContext)

const [articlesList, setArticlesList]=useState([]);
const [editArticle, setEditArticle]=useState('');

const getArticlesList=()=>{
    reqInstance.get("/article")
    .then((res)=>{
        isAuthenticate
            ?setArticlesList(res.data.sort((a,b)=>a.date<b.date? 1:-1))
            :setArticlesList(res.data.filter(article=>article.visibility===true).sort((a,b)=>a.date<b.date? 1:-1))
    })
}

useEffect(()=>{
    getArticlesList()
    console.log(isAuthenticate)
}, [])

const getEditArticle=(articleToEdit)=>{
    setEditArticle(articlesList.find((art)=>art._id === articleToEdit._id))
    
}

    return (
       <articlesContext.Provider value={ { articlesList, getArticlesList,
        editArticle, setEditArticle,getEditArticle } }>
            { children }
       </articlesContext.Provider>
    );
};

export default ArticlesContextProvider;