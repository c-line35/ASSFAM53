import React, { useContext, useState } from 'react';
import{NavLink} from 'react-router-dom';
import Auth from '../components/Auth';
import ButterfliesAnim from '../components/ButterfliesAnim';
import { authContext } from '../context/AuthContext';

const Intro = () => {

    const { token }=useContext(authContext)
    const [connect, setConnect]=useState(false);

    const getConnect=()=>{
        setConnect(true);
    }

    return (
        <>
        {connect&& <Auth />} 
        {!connect&&
        <div>
            <ButterfliesAnim />
        <div className = "header">
            <img src='./assets/logos/logo.png' alt="Logo de l'association"></img>
            <h1>
                Association des  familles d'accueil <br/>
                de La Mayenne
            </h1>
        </div>
        <main>
           
             <div className='bg-img'>
                <p className='citation'>
                "Au sein d'une famille d'accueil,<br/>
                l'enfant grandit et s'épanouit<br/>
                dans le respect de son histoire et de sa culture,<br/>
                pour mieux prendre son envol."
                </p>

                {token
                ?<div>
                <NavLink to ="/home" ><h2 className='level level--visit'>Visiteurs</h2></NavLink> 
                <NavLink to ="/home" ><h2 className='level level--adher'>Adhérents</h2></NavLink>
                <NavLink to ="/management"><h2 className='level level--admin'>Administrateurs</h2></NavLink> 
                <NavLink to ="/offers"><h2 className='level level--child'>Le coin des enfants</h2></NavLink> 
                </div>
             :<div>
            
               <div>
                <NavLink to ="/home" ><h2 className='level level--visit'>Visiteurs</h2></NavLink> 
                <h2 className='level level--adher' onClick={getConnect}>Adhérents</h2>
                <NavLink to ="/management"><h2 className='level level--admin'>Administrateurs</h2></NavLink> 
                <NavLink to ="/offers"><h2 className='level level--child'>Le coin des enfants</h2></NavLink> 
                </div>   
                </div>  }
        
                <div className='partner'>
                    <img src='./assets/logos/icone-fnaf.png' alt='logo fnaf'/>
                    <img src='./assets/logos/logo-mayenne-petit.png' alt='logo département Mayenne'/>
                    <img src='./assets/logos/icone-udaf.png' alt='logo udaf'/>
                </div>
                
                   
            </div>
            
          
           
        </main>
        </div>
        }
        </>
    );
};

export default Intro;