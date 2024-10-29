import React, {useContext, useState, useEffect } from 'react';
import BookLike from '../components/BookLike';
import { bookContext } from '../context/BookContext';
import { Modal, Form, Button, Rate, Input } from 'antd';


const Book = ({ book, getBookListe  }) => {

    const { userId, postNotice, deleteNotice, noticeListe, getNoticeListe, setNoticeListe } = useContext(bookContext);
 
    const [showBook, setShowBook]= useState(false);
    const [showPublishNotice, setShowPublishNotice]= useState(false);
    const [someNotices, setSomeNotices] = useState();
    const [yourNotice, setYourNotice]=useState();
    const [average, setAverage]=useState();



    const getYourNotice=()=>{
        noticeListe.forEach(element => {
        if(element.userId === userId){
           setYourNotice(element)
            } 
        });  
    }

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

    useEffect(()=>{
        getLevelAvg()
    },[])

    const selectBook=()=>{
        setShowBook(true)
        getNoticeListe(book)
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
        let newNotice={
            userId:userId,
            content: values.content,
            date: Date.now(),
            level: values.level
        }
        noticeListe.push(newNotice)
        setYourNotice(values);
        postNotice(book, values);
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
                    {average
                            ?<div className='book_text_star'>
                                <Rate allowHalf disabled defaultValue={average} />
                                <span>({book.notice.length} avis)</span>
                                </div>
                                :<div className='book_text_star'>Pas encore d'avis</div>    
                            }                     
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
                            {average
                            ?<div className='book_text_star'>
                                <Rate allowHalf disabled defaultValue={average} />
                                <span>({book.notice.length} avis)</span>
                                </div>
                                :<div className='book_text_star'>Pas encore d'avis</div>    
                            }
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
                                    {noticeListe
                                        .sort((a,b)=>a.date>b.date? -1:1)
                                        .map((notice, index)=>
                                    <div key={index}> 
                                        <div className='noticeInfos'>
                                            <div>Par: {notice.userId.firstName}</div>
                                            <div>Publié le: {dateFormater(notice.date)}</div>
                                            <div>{notice.level}</div>
                                            <Rate disabled defaultValue={notice.level} />
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