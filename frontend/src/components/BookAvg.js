import React, { useEffect, useState } from 'react';
import { Rate } from 'antd';

const BookAvg = ({ book }) => {

    const [average, setAverage]=useState();
    const noticeLength = book.notice.length;


    const getLevelAvg = () =>{
        if(book.notice.length>0){
            let total =0
            for(let avis of book.notice){
            total += avis.level
            }
            let avg = total/(book.notice.length)
            setAverage(avg)
        }else{setAverage('')}
    }
    
    useEffect(()=>{
        getLevelAvg()
    },[noticeLength])
    
    

    return (
        <div>
            <div>
                {average
                ?<div className='book_text_star'>
                    <Rate allowHalf disabled value={average} />
                    <span>({noticeLength} avis)</span>
                    </div>
                :<div className='book_text_star'>Pas encore d'avis</div>    
                }
            </div>
        </div>
    );
};

export default BookAvg;