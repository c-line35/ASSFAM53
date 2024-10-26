import React, {useContext, useState } from 'react';
import BookLevel from './BookLevel';
import BookLike from '../components/BookLike';
import { bookContext } from '../context/BookContext';
import { Modal, Form, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import BookNote from './BookNote';



const Book = ({ book, getBookListe  }) => {

    const { noticeListe, getNoticeListe, userId} = useContext(bookContext)

    const [selectedBook, setSelectedBook]= useState('');
    const [showBook, setShowBook]= useState(false);
    const [someNotices, setSomeNotices] = useState();
    const [yourNotice, setYourNotice]=useState();

    const getYourNotice=(book)=>{
        book.notice.forEach(element => {
        if(element.userId === userId){
           setYourNotice(element)
            } 
        });  
    }

    const selectBook=(book)=>{
        setShowBook(true)
        setSelectedBook(book)
        getNoticeListe(book)
        book.notice.length>=1 ? setSomeNotices(true):setSomeNotices(false) 
        getYourNotice(book)   
    }

    const handleCancel=()=>{
        setShowBook(false)
        setSelectedBook('')
        getBookListe()
    }

    const dateFormater = (date) =>{
        let newdate = new Date(date).toLocaleDateString('fr-FR', {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        })
        return newdate
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
                width={1000}
                footer= {null}
            >
                <div className='bookDetail'>
                    <div className='bookDetail_visuel'>
                        <div className='bookDetail_visuel_image'>
                            <img src={book.imageUrl} alt={book.title}/>                        
                        </div>
                        <BookLevel notice={book.notice}/>
                    </div>    
                    <div className='bookDetail_text'>
                        <div className='bookDetail_text_info'>
                            <div className='bookDetail_text_info_title'>{book.title}</div>
                            <div className='bookDetail_text_info_author'>{book.author}</div>
                        </div>
                         
                        <div className='bookDetail_text_resume'>{book.resume}</div> 
                        <div className='bookDetail_text_notice' > 
                        <h3>Avis des lecteurs</h3>
                        {someNotices?
                        <div>
                             {yourNotice?
                                <div className ='yourNotice'>
                                    <Form>
                                        <Form.Item label='Votre avis'>
                                            <TextArea defaultValue={yourNotice.content}/>
                                        </Form.Item>
                                        <Button type='text'>Valider</Button>
                                    </Form>
                                </div>
                               :<div className='button2'>Publiez votre avis</div>    
                                } 
                                {noticeListe.map((notice, index)=>
                            <div key={index}> 
                                <div className='noticeInfos'>
                                    <div>Par: {notice.userId.firstName}</div>
                                    <div>Publié le: {dateFormater(notice.date)}</div>
                                    <BookNote note = {notice.level}/> 
                                    
                                </div>
                                
                                <div className='noticeContent'>
                                    <p>{notice.content}</p><hr/>
                                </div>
                            </div>
                            )}
                        </div> 
                        :<div className='button2'>Soyez le premier à donner votre avis</div>
                        } 
                      {/*   
                       
                           
                            
                       */}
                    </div>     
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