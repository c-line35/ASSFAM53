import React, { useContext } from 'react';
import Header from '../components/Header';
import CarrouselArticle from'../components/CarrouselArticles';
import Events from '../components/Events';
import Footer from '../components/Footer';
import MyMap from '../components/MyMap'
import { authContext } from '../context/AuthContext';

const Home = () => {

  const { isAuthenticate }=useContext(authContext)
 
  return (
    <div>
      <Header /> 
      
      <div className='containerHome'> 
        <div className='containerHome__carrousel'> 
          <CarrouselArticle /> 
        </div>  
       {/*  <div className='testimony'>
          <video width="320" height="240" controls>
            <source src='./assets/videos/temoignages.mp4' type='video/mp4'></source>
          </video>
          <h1>Témoignages... </h1>
        </div>   */}
         {isAuthenticate&& 
         <div className='containerHome__map'>
          <h2>Besoin de renseignements? <br/>Trouver un membre du bureau proche de chez vous</h2>
          <MyMap />
         </div>
         }    
        </div>
      
        <Events />
  
      <Footer />
    </div>
  )
}

export default Home
