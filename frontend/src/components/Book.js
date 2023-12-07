import React from 'react';

const Book = ({ book }) => {
    return (
        <div className='book'>
            <div className='book_image'>
                <img src={book.imageUrl} alt={book.title}/>
            </div>
            <div className='book_text'>
                <div className='book_text_title'>{book.title}</div>
                <div className='book_text_author'>{book.author}</div>
                <div className='book_text_star'>
                    <div className='book_text_star--1'>
                        <img src='assets/icones/etoile-jaune.png' alt='étoile' />
                    </div>
                    <div className='book_text_star--2'>
                        <img src='assets/icones/etoile-jaune.png' alt='étoile' />
                    </div>
                    <div className='book_text_star--3'>
                        <img src='assets/icones/etoile-jaune.png' alt='étoile' />
                    </div>
                    <div className='book_text_star--4'>
                        <img src='assets/icones/etoile-grise.png' alt='étoile' />
                    </div>
                    <div className='book_text_star--5'>
                        <img src='assets/icones/etoile-grise.png' alt='étoile' />
                    </div>
                </div>
                <div className='book_text_details'>Détails</div>
            </div>
        </div>
    );
};

export default Book;