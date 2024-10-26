import React, {useState } from 'react';
import BookLevel from './BookLevel';
import BookLike from '../components/BookLike';
import { Modal } from 'antd';


const Book = ({ book, getBookListe  }) => {

    const [selectedBook, setSelectedBook]= useState('')
    const [showBook, setShowBook]= useState(false);

    const selectBook=(book)=>{
        setShowBook(true)
        setSelectedBook(book)
    }

    const handleCancel=()=>{
        setShowBook(false)
        setSelectedBook('')
        getBookListe()
    }

    return (
        <div className='mainBook'>
            <div className='book' onClick={()=>{selectBook(book)}} id='book'>
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
            <div className='likeMain'>
                <BookLike book={book}/> 
            </div>             
            <Modal
                visible={showBook} 
                destroyOnClose={true}
                onCancel={handleCancel}
                width={800}
                footer= {null}
            >
                <div className='bookDetail' id="bookDetail">
                    <div className='bookDetail_image'>
                        <img src={book.imageUrl} alt={book.title}/>
                    </div>
                    <div className='bookDetail_text'>
                        <div className='bookDetail_text_info'>
                            <div className='bookDetail_text_info_title'>{book.title}</div>
                            <div className='bookDetail_text_info_author'>{book.author}</div>
                        </div>
                         <BookLevel notice={book.notice}/> 
                    </div>                
                </div>     
                <div className='likeDetail'> 
                    <BookLike book={book}/> 
                </div>
               
            </Modal>       
        </div>
    );
};

export default Book;