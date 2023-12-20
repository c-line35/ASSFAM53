import React from 'react';
import BookLevel from './BookLevel';

const Book = ({ book, showBook, setShowBook, selectedBook, setSelectedBook }) => {

    const selectBook=(book)=>{
        setShowBook(true)
        setSelectedBook(book)
        console.log(book)
    }

    return (
            <div className='book' onClick={()=>{selectBook(book)}}>
                <div className='book_image'>
                    <img src={book.imageUrl} alt={book.title}/>
                </div>
                <div className='book_text'>
                    <div className='book_text_info'>
                        <div className='book_text_info_title'>{book.title}</div>
                        <div className='book_text_info_author'>{book.author}</div>
                    </div>
                    <BookLevel notice={book.notice}/>
                </div>
            </div>
    );
};

export default Book;