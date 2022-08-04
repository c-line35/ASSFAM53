import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';

const Partners = () => {
  return (
    <div>
      <Header />
      <div className='partners'>
        <a href='https://www.lamayenne.fr/' target='blank'><img src='./assets/logos/logo-mayenne-petit.png' alt='site internet de la mayenne'/></a>
        <a href ='https://www.fnaf.info/' target='blank'><img src='./assets/logos/icone-fnaf.png' alt='site internet de la fédération nationnale des assistants familiaux'/></a>
        <a href ='https://www.udaf53.fr/' target='blank'><img  src='./assets/logos/icone-udaf.png' alt="site de l'union départementale des associations familiales"/></a>
      </div>
      <Footer />
    </div>
  )
}

export default Partners
