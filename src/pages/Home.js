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
        <Carrousel />
        <Events />
      </div>
      <Footer />
    </div>
  )
}

export default Home
