import React from 'react';
import { Modal } from 'antd';

const BookDetail = ({ book, selectedBook, setSelectedBook, showBook, setShowBook, handleCancel}) => {
    return (
        <div>
             <Modal
                title="Ajouter un document" 
                visible={showBook} 
                destroyOnClose={true}
                onCancel={handleCancel}
                width={1000}
            >    
            <div className='mainBookDetail'>
            <div className='bookDetail'>
                <div className='bookDetail_image'>
                    <img src={book.imageUrl} alt={book.title}/>
                </div>
                <div className='bookDetail_text'>
                    <div className='bookDetail_text_info'>
                        <div className='bookDetail_text_info_title'>{book.title}</div>
                        <div className='bookDetail_text_info_author'>{book.author}</div>
                    </div>
                </div>
            </div>
        </div>
            </Modal>  
        </div>
    );
};

export default BookDetail;