import React, { useContext, useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { authContext } from '../context/AuthContext';

const ResetPassword = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { reqInstance } = useContext(authContext)
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
 };

 const sendMail=(res, values)=>{
    alert(`message envoyé`);
      const templateId = 'template_respass';
      const serviceID = 'assfam53';
      sendFeedback(serviceID, templateId, { user_email: values.email, token: res.data.token} )
  }
  const sendFeedback = (serviceID, templateId, variables) => {
    window.emailjs.send(
        serviceID, templateId,
        variables
    ).then(res => {
        console.log('Email successfully sent!')
    })
        .catch(err => console.error('There has been an error.  Here some thoughts on the error that occured:', err))
    }

    const onFinish =(values)=>{
        reqInstance.post(
            '/auth/pass',
            {email: values.email}
        )
        .then((res)=>
            {
            sendMail(res, values)
            handleCancel()
        } )
       
    }
 

    return (
        <div>
            <div className='resetPassword' onClick={showModal}>1ère connexion ou mot de passe oublié</div>
                <Modal title="Réinitialisation du mot de passe" 
                visible={isModalVisible}
                destroyOnClose={true} 
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                      Annuler
                    </Button>
                ]}
                >
                    <div>Indiquer votre adresse email, vous recevrez un message avec un lien pour réinitialiser votre mot de passe</div>
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Veuillez indiquer votre adresse email!',
                        },
                        ]}
                    >
                        <Input className="site-form-item-icon" placeholder='Email'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Envoyer</Button>
                    </Form.Item>
                    </Form>
                </Modal>
        </div>
    );
};

export default ResetPassword;