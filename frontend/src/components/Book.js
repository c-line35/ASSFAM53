import React from 'react';
import BookLevel from './BookLevel';

const Book = ({ book }) => {

    return (
        <div className='book'>
            <div className='book_image'>
                <img src={book.imageUrl} alt={book.title}/>
            </div>
            <div className='book_text'>
                <div className='book_text_title'>{book.title}</div>
                <div className='book_text_author'>{book.author}</div>
                <BookLevel notice={book.notice}/>
                <div className='book_text_details'>Détails</div>

            </div>
        </div>
    );
};

export default Book;