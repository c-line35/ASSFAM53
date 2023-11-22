import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';
import { libraryContext } from '../context/LibraryContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const Library = () => {

    const { bookListe, getBookListe }=useContext(libraryContext)

    useEffect(()=>{
        getBookListe()
        console.log(bookListe)
    }, [])

    return (
        <div>
          <Header />
            
          <Footer/>
          </div>
    )
}

export default Library