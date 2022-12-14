import articlesList from'../data/articlesList';
import Article from './Article';
import { Carousel } from 'antd';

const contentStyle = {
  height: '160px',
  color: '#000',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const CarrousselArticle=() =>{

  return (
    <>
    <Carousel autoplay>
      
    {articlesList.map((articles)=>(
    <div style={contentStyle} >  
    <Article articles={articles} key={articles.position}/> 
      </div>) )}
     
  </Carousel>
     
    </>
  );
}
export default CarrousselArticle