import React, { useContext, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { authContext } from '../context/AuthContext';
import Auth from '../components/Auth';

let urlPage = window.location.href ;
let url = new URL(urlPage);
let token = url.searchParams.get("token")

const validePassword = new RegExp (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/)

const InitPassword = () => {

    const { reqInstance }=useContext(authContext)

    const [ newPassword, setNewPassword ]=useState('')
    const [ confirm, setConfirm]=useState('')
    const [ isPasswordModif, setIsPasswordModif]=useState(false);
    const [messageError, setMessageError]=useState();

    const getNewPassword=(e)=>{
      setNewPassword(e.target.value)
    }
    const getConfirm=(e)=>{
      setConfirm(e.target.value)
    }
  
     const onFinish=()=>{
      if(newPassword !== confirm) {
        alert('Veuillez entrer 2 mots de passe identiques!')
      }else{
        reqInstance.put(
          `/auth/user/${token}`,
          {password: newPassword}
          )
          .then(()=>{
            setConfirm('')
            setNewPassword('')
            setIsPasswordModif(true)
            alert('Votre mot de passe a bien été modifié')
          })
          .catch(()=>setMessageError('Une erreur est survenue'))
        }
      } 
      return (
        <div className = 'initPassword'>
        {
          isPasswordModif
          ?<Auth />
          :<div className='initPassword__form'>
              <div className='initPassword__form__header'>
                <img src='../assets/logos/logo.png' alt="logo de l'association"></img>
                <h2>Réinitialisation du mot de passe</h2>
              
              </div>
            <Form
             name="initPassword"
             onFinish={onFinish}
             labelCol={{ span: 12}}
             >
              <Form.Item
                name="password"
                label="Nouveau mot de passe"
                onChange={getNewPassword}
                value={newPassword}
                rules={[
                  {
                    required: true,
                    message: 'Veuillez rentrer un mot de passe',
                  },
                  {
                    pattern: validePassword,
                    message:`Votre mot de passe doit contenir entre 
                    8 à 15 caractères__
                    au moins une lettre minuscule__
                    au moins une lettre majuscule__
                    au moins un chiffre__
                    au moins un de ces caractères spéciaux: $ @ % * + - _ !`
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirmation du mot de passe"
                onChange={getConfirm}
                value={confirm}
                rules={[
                  {
                    required: true,
                    message: 'Veuillez confirmer votre mot de passe!',
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item >
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Envoyer
                </Button>
              </Form.Item>
              {messageError&& <div className='message-error'>{messageError}</div>}
            </Form>
          </div>
          }
      </div>
    );
};

export default InitPassword;