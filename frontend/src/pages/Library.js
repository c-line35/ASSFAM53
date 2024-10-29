import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';
import Book from './../components/Book'
import { libraryContext } from '../context/LibraryContext';
import { useContext } from 'react';
import { authContext } from '../context/AuthContext';


const Library = () => {

    const { isAuthenticate }= useContext(authContext)
    const { bookListe, getBookListe }=useContext(libraryContext);
 


    
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
                        getBookListe={getBookListe}
                        />)
                    )
                }
            </div>
        </main>
          <Footer/>
          </div>
    )
}

export default Library