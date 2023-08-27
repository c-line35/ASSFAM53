//import articlesList from'../data/articlesList';
import Article from './Article';
import { Carousel } from 'antd';
import  React, { useContext, useEffect } from 'react';
import { articlesContext } from '../context/ArticlesContext';
import { authContext } from '../context/AuthContext';

const contentStyle = {
  height: '160px',
  color: '#000',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const CarrousselArticle=() =>{

  const { articlesList, getArticlesList } = useContext(articlesContext);
  const { isAuthenticate }=useContext(authContext)
  useEffect(()=>{
    getArticlesList()
  },[])

 
  return (
    <>
   <Carousel autoplay>
    {articlesList&&
      isAuthenticate
        ?articlesList
        .map((articles, index)=>(
          <div style={contentStyle} key={index}>  
            <Article articles={articles} /> 
          </div>) )
        :articlesList
        .filter(article=>article.visibility===true)
        .sort((a,b)=>a.date<b.date? 1:-1)
        .map((articles, index)=>(
          <div style={contentStyle} key={index}>  
            <Article articles={articles} /> 
          </div>) )
        
     }
  </Carousel> 
 
   
    </>
  );
}
export default CarrousselArticle