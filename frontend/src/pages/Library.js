import React, { useState } from 'react'
import { Modal } from 'antd';

import Header from '../components/Header'
import Footer from '../components/Footer';
import Book from './../components/Book'
import { libraryContext } from '../context/LibraryContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { authContext } from '../context/AuthContext';

const Library = () => {

    const { isAuthenticate }= useContext(authContext)
    const { bookListe, getBookListe }=useContext(libraryContext);
    const [showBook, setShowBook]= useState(false);
    const [selectedBook, setSelectedBook]= useState('')

    useEffect(()=>{
        getBookListe()
    }, [])

    const handleCancel=({})=>{
        setShowBook(false)
        setSelectedBook('')
    }

    return (
        <div>
          <Header />
          <main className='libraryPage'>
            <div className='libraryNav'></div>
            <div className='library'>
                {
                    bookListe&&
                    isAuthenticate&&
                    bookListe.map((book, index)=>
                    ( <Book 
                        book={book} 
                        key={index} 
                        showBook={showBook} 
                        setShowBook={setShowBook}
                        selectedBook={selectedBook}
                        setSelectedBook={setSelectedBook}
                        />)
                    )
                }
            </div>
            <Modal
                title="Ajouter un document" 
                visible={showBook} 
                destroyOnClose={true}
                onCancel={handleCancel}
            >    
            <div>{selectedBook.title}</div>
            </Modal>  
        </main>
          <Footer/>
          </div>
    )
}

export default Library