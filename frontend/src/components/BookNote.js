import React, { useState, useEffect} from 'react';

const BookNote = ({ note }) => {

    const [colorStar, setColorStar]=useState([''])

    const getColorStar =(note)=>{
        
        let colorArray = [false,false,false,false,false ]
        let i=0;
        while(i<note){
            colorArray.splice(i, 1, true)
            i++
        }
        setColorStar(colorArray)
    }

    useEffect(()=>{
        getColorStar(note)
    },[])


    return (
        <div>
            <div className='book_text_star'>
                {colorStar.map((color, index)=>
                     (<div className='book_text_star' key={index}>
                        {
                            color
                            ?<img src='assets/icones/etoile-jaune.png' alt='étoile' />
                            :<img src='assets/icones/etoile-grise.png' alt='étoile' />
                        }
                        </div>)
                )}
                </div>
        </div>
    );
};

export default BookNote;