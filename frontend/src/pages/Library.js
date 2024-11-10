import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';
import Book from './../components/Book'
import { libraryContext } from '../context/LibraryContext';
import { useContext } from 'react';
import { authContext } from '../context/AuthContext';


const Library = () => {

    const { isAuthenticate }= useContext(authContext)
    const { bookListe, getBookListe }=useContext(libraryContext);

    const [selectedCat, setSelectedCat]=useState('');
    const [selectedTheme, setSelectedTheme]=useState('');

    const categories = ['Enfant', 'Adulte'];
    
    const getUniqueElements=(array)=> {
        return array.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
    }

    const getTheme=(cat)=>{
        const newListe = bookListe.filter((el)=>el.cat.toLowerCase() ===cat)
        const themeListe = []
        for(let livre of newListe){
            for(let theme of livre.theme){
                themeListe.push(theme)
            }
        }  
        const liste = getUniqueElements(themeListe)  
        return(liste)    
    }

    const getThemeListe = ()=>{
        let arrayCat=[];
        let obj;
        for(let cat of categories){
            const liste =getTheme(cat.toLocaleLowerCase())
            obj = {
                nom:cat,
                liste:liste
            }
            arrayCat.push(obj)
        }
        return(arrayCat)
    }

    const selectCat=(cat)=>{
        setSelectedCat(cat.nom)
        setSelectedTheme("")
    }
    
    const selectTheme=(cat, theme)=>{
        setSelectedCat(cat.nom)
        setSelectedTheme(theme)
    }


    return (
        <div>
          <Header />
          <main className='libraryPage'>
            <div className='libraryNav'>
                {
                    getThemeListe().map((cat, index)=>(
                        <div key={index} className='libraryNav_liste'>
                            <h3 onClick={()=>{selectCat(cat)}}>{cat.nom}</h3>
                            {cat.liste.map((theme, index)=>(
                                <p onClick={()=>{selectTheme(cat, theme)}} key={index}>{theme}</p>
                            ))}
                        </div>
                    ))
                }
            </div>
            <div className='library'>
                <div className='categorie'>
                {selectedCat.length>=1
                    ?
                    selectedTheme.length>=1
                        ?
                        <div>
                            <h1>Livres {selectedCat}</h1>
                            <h2>{selectedTheme}</h2>
                        </div>
                        :<h1>Livres {selectedCat}</h1>
                    :<h1>Tous les livres</h1>
                }
                </div>
                <div className='allBooks'>
                {
                    bookListe&&
                    isAuthenticate&&
                    selectedCat.length>=1
                        ?selectedTheme.length>=1 
                        ?bookListe
                        .filter((book)=>book.cat===selectedCat.toLowerCase() )
                        .filter((book)=>book.theme.includes(selectedTheme) )
                        .map((book, index)=>
                    ( <Book 
                        book={book} 
                        key={index}
                        getBookListe={getBookListe}
                        />)
                    ):bookListe
                    .filter((book)=>book.cat===selectedCat.toLowerCase() )
                    //.filter((book)=>book.theme.includes(selectedTheme) )
                    .map((book, index)=>
                ( <Book 
                    book={book} 
                    key={index}
                    getBookListe={getBookListe}
                    />)
                )
                    :bookListe
                    .map((book, index)=>
                ( <Book 
                    book={book} 
                    key={index}
                    getBookListe={getBookListe}
                    />)
                )
                }</div>
            </div>
        </main>
          <Footer/>
          </div>
    )
}

export default Library