import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const BookLevel = ({ notice }) => {

    const [average, setAverage]=useState()
    const [colorStar, setColorStar]=useState([''])
    const [noticeLenght, setNoticeLenght]=useState(notice.length)

    const getLevelAvg = () =>{
        if(notice.length>0){
            console.log(notice.length) 
            let total =0
            for(let avis of notice){
            total += avis.level
            }
            let avg = total/(notice.length)
            setAverage(Math.round(avg))
        }
    }
    
    const getColorStar =()=>{
        if(average){
            let colorArray = [false,false,false,false,false ]
            let i=0;
            while(i<average){
                colorArray.splice(i, 1, true)
                i++
            }
            setColorStar(colorArray)
        }
    }

    useEffect(()=>{
        getLevelAvg()
    },[])

    useEffect(()=>{
        getColorStar()
    },[average])
    

    return (
        <div>
            {average
            ?<div className='book_text_star'>
                {colorStar.map((color, index)=>
                     (<div className='book_text_star' key={index}>
                        {
                            color
                            ?<img src='assets/icones/etoile-jaune.png' alt='étoile' />
                            :<img src='assets/icones/etoile-grise.png' alt='étoile' />
                        }
                        </div>)
                )}
                <span>({noticeLenght})</span>
                </div>
                :<div>Pas encore d'avis</div>    
            }
        </div>
    );
};

export default BookLevel;