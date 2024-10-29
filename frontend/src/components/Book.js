import React, {useContext, useState, useEffect } from 'react';
import BookLike from '../components/BookLike';
import { bookContext } from '../context/BookContext';
import { Modal, Form, Button, Rate, Input } from 'antd';
import BookNote from './BookNote';
import BookAvg from './BookAvg';

const Book = ({ book, getBookListe  }) => {


    const { userId, postNotice, deleteNotice } = useContext(bookContext);
 
    const [showBook, setShowBook]= useState(false);
    const [showPublishNotice, setShowPublishNotice]= useState(false);
    const [someNotices, setSomeNotices] = useState();
    const [yourNotice, setYourNotice]=useState();
    const [average, setAverage]=useState();

    const getLevelAvg = () =>{
        if(book.notice.length>0){
            let total =0
            for(let avis of book.notice){
            total += avis.level
            }
            let avg = total/(book.notice.length)
            setAverage(avg)
        }
    }
    

    const getYourNotice=()=>{
        book.notice.forEach(element => {
        if(element.userId === userId){
           setYourNotice(element)
            } 
        });  
    }

    const selectBook=()=>{
        setShowBook(true)
        book.notice.length>=1 ? setSomeNotices(true):setSomeNotices(false) 
        getYourNotice();
    }

    const handleCancel=()=>{
        setShowBook(false)
        setShowPublishNotice(false)
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

    const valideNotice= (values)=>{
        setYourNotice(values);
        postNotice(book, values);
        getBookListe();
        setSomeNotices('true');
    }

    const deleteThisNotice=()=>{
        deleteNotice(yourNotice);
        setYourNotice('');
        getBookListe();
    }

    return (
        <div className='mainBook'>
{/* -----------------------PAGE PRINCIPALE  (liste des livres)--------------------------------------------------------------------------------*/}            
            <div className='book' onClick={()=>{selectBook(book)}} id='book'>
                <div className='book_image'>
                    <img src={book.imageUrl} alt={book.title}/>
                </div>
                <div className='book_text'>
                    <div className='book_text_info'>
                        <div className='book_text_info_title'>{book.title}</div>
                        <div className='book_text_info_author'>{book.author}</div>
                    </div> 
                    <BookAvg book={book} valideNotice={valideNotice}/>         
                </div>                           
            </div>
            <div className='likeMain'>
                <BookLike book={book}/> 
            </div> 
{/* ---------------------MODAL DETAIL DU LIVRE---------------------------------------------------------------------------       */}            
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
                        <BookAvg book={book}/>
                        </div>    
                    <div className='bookDetail_text'>
                        <div className='bookDetail_text_info'>
                            <div className='bookDetail_text_info_title'>{book.title}</div>
                            <div className='bookDetail_text_info_author'>{book.author}</div>
                        </div>
                        <div className='bookDetail_text_resume'>{book.resume}</div> 

                        
    {/* -----------AVIS----------- */}
        
                        <div className='bookDetail_text_notice' > 
                            <h3>Avis des lecteurs</h3>
                
                        {/* -----------si il y a des avis----------- */} 
                            {someNotices?
                            <div>
                        
                            {/* -----------si l'utilisateur a déjà posté un avis----------- */} 
                                {yourNotice?
                                <div>
                                    <div className ='yourNotice'>Votre avis: {yourNotice.content}</div>
                                    <div className='button2'>Modifier</div>
                                    <div className='button2'onClick={()=>deleteThisNotice()}>Supprimer</div>
                                </div>                         
            
                            /* -----------si l'utilisateur n'a pas donné son avis sur le livre----------- */
                                :<div>

                                {/* -----------formulaire de post d'un avis----------- */}                    
                                    {showPublishNotice?
                                           <div className ={yourNotice}>
                                            <Form 
                                            name="post_notice"
                                            onFinish={(values)=>{valideNotice(values, book)}}
                                            >
                                                <Form.Item name="content">
                                                    <Input.TextArea />
                                                </Form.Item>
                                                <Form.Item name="level" label="Note">
                                                    <Rate />
                                                </Form.Item>
                                                <Button type="primary" htmlType="submit" >Valider</Button>
                                                <Button type='text' onClick={()=>setShowPublishNotice(false)}>Annuler</Button>
                                            </Form>
                                       </div>
                                        
                                /* -----------pas d'action----------- */
                                    :<div className='button2'onClick={()=>{setShowPublishNotice(true)}}>Donnez votre avis</div>    
                                    }
                                </div>
                                }

            {/* -----------Liste Des avis----------- */}
                                    {book.notice
                                        .sort((a,b)=>a.date>b.date? -1:1)
                                        .map((notice, index)=>
                                    <div key={index}> 
                                        <div className='noticeInfos'>
                                            <div>Par: {notice.firstName}</div>
                                            <div>Publié le: {dateFormater(notice.date)}</div>
                                            <div>{notice.level}</div>
                                            <BookNote notice={notice}/>
                                        </div>                                           
                                            <div className='noticeContent'>
                                                <p>{notice.content}</p><hr/>
                                            </div>
                                        </div>
                                        )
                                    }
                                </div>
                        /* -----------si il n'y a pas encore d'avis----------- */ 
                            :<div>

                                {/* -----------formulaire de post d'un avis----------- */}                                
                                {showPublishNotice?
                                <div className ={yourNotice}>
                                    <Form 
                                        name="post_notice"
                                        onFinish={(values)=>{valideNotice(values, book)}}
                                    >
                                        <Form.Item name="content">
                                            <Input.TextArea />
                                        </Form.Item>
                                        <Form.Item name="level" label="Note">
                                            <Rate />
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit" >Valider</Button>
                                        <Button type='text' onClick={()=>setShowPublishNotice(false)}>Annuler</Button>
                                    </Form>
                                </div>
                                /* -----------pas d'action----------- */
                                :<div className='button2'onClick={()=>{setShowPublishNotice(true)}}>Soyez le premier à donner votre avis</div>       
                                }
                            </div>
                            } 
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