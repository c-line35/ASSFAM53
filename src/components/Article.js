import React from 'react';

const Article = ({articles}) => {
    return (
        <div className="article">
        <div className="article__content">
          <div className="article__content__title">{articles.title}</div>
          <div className="article__content__image">
            <img src={articles.img} alt={articles.img}/>
          </div>
        </div>
        <div className="article__text">{articles.txt.map((texte, index)=>(
          <p key = {index} >{texte}</p>))}
        </div>
        {articles.openPage? <div className="button">
          <a href={'./assets/'+ articles.pdfLink +'.pdf'} target="blank">En savoir plus</a>
        </div>:""}
    </div>
    );
};

export default Article;