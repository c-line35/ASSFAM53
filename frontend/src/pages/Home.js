import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import CarrouselArticle from'../components/CarrouselArticles';
import Events from '../components/Events';
import Footer from '../components/Footer';
import MyMap from '../components/MyMap'
import { Button, Modal } from 'antd';
import { staffContext } from '../context/StaffContext';


const Home = () => {

  const { getAllStaff }=useContext(staffContext)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    getAllStaff()
  };
  
  const handleCancelCreate = () => {
    setIsModalVisible(false);
    
}
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
          <Button type="primary" onClick={showModal}>
        Trouver un membre du conseil d'admistration
      </Button>
      <Modal 
        visible={isModalVisible} 
        destroyOnClose={true}
        onCancel={handleCancelCreate}
        footer={[
          <Button key="back" onClick={handleCancelCreate}>
          Fermer
      </Button>,
        ]}
        >

        <MyMap />
      </Modal>
            <div className='testimony'>
              <h1>Témoignages... </h1>
            <video width="320" height="240" controls>
              <source src='./assets/videos/temoignages.mp4' type='video/mp4'></source>
            </video>
             </div>
            
            
             <CarrouselArticle /> 
            
         
          
        </div>
        <Events />
      </div>
      <Footer />
    </div>
  )
}

export default Home
