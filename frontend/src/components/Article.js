import React from 'react';

const Article = ({articles}) => {
    return (
      
        <div className="article">
        <div className="article__content">
          <div className="article__content__title">{articles.title}</div>
          {articles.imageUrl&&
          <div className="article__content__image">
            <img src={articles.imageUrl} alt={articles.title}/>
          </div>
          }
        </div>
        <div className="article__text">{articles.content.map((texte, index)=>(
          <p key = {index} >{texte}</p>))}
        </div>
        {articles.document&& <div className="button">
          <a href={articles.document} target="blank">En savoir plus</a>
        </div>}
        {articles.lien&& <a target='blank' href={articles.lien}>En savoir plus</a>}
    </div>
      
    );
};

export default Article;