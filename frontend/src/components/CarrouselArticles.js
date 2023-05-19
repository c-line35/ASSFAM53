//import articlesList from'../data/articlesList';
import Article from './Article';
import { Carousel } from 'antd';
import  React, { useContext, useEffect } from 'react';
import { articlesContext } from '../context/ArticlesContext';

const contentStyle = {
  height: '160px',
  color: '#000',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const CarrousselArticle=() =>{

  const { articlesList, getArticlesList } = useContext(articlesContext);
  useEffect(()=>{getArticlesList()},[])
  return (
    <>
   <Carousel autoplay>
    {articlesList&&
      articlesList.map((articles, index)=>(
        <div style={contentStyle} key={index}>  
        <Article articles={articles} /> 
        </div>) )
     }
  </Carousel> 
 
   
    </>
  );
}
export default CarrousselArticle