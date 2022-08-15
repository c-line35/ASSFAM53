import React from 'react';
import Header from '../components/Header';
import Carrousel from'../components/Carrousel';
import Events from '../components/Events';
import Footer from '../components/Footer';


const Home = () => {
  return (
    <div>
      <Header />
      <div className='container'> 
        <div className='container__carrousel'> 
          <div className='intro'>
            <p>Bienvenu sur notre nouveau site!</p>
            <p>Ce site est en cours de fabrication, vous trouverez plus de fonctionnalités petit à petit...</p>
            <p>Merci de votre compréhension</p>
          </div>
          <Carrousel /> 
        </div>
        <Events />
      </div>
      <Footer />
    </div>
  )
}

export default Home
