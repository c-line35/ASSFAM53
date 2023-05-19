import React, { useContext, useState } from 'react';

import { staffContext } from '../../context/StaffContext';
import { authContext } from '../../context/AuthContext';

import {Button, Modal, Form, Input, Cascader, Upload} from "antd";

import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';


const UpdateStaff = ({ staff, setStaff, isModalVisible, setIsModalVisible}) => {

    const {  reqBearer } = useContext(authContext);
    const { getAllStaff } = useContext(staffContext);

    const [isEdit, setIsEdit]=useState(false);
    const [grade, setGrade]=useState('');
    const [ca, setCa]=useState('');
    const [image, setImage]=useState('');
    const [tmpMission, setTmpMission]=useState(staff.mission);
    const [newMission, setNewMission]=useState('');
    const [getCoordonnees, setGetCoordonnees]=useState('')
    const [seeAddMission, setSeeAddMission]=useState(false);
    const [messageError, setMessageError]=useState();

    const headers = 'Content-Type : multipart/form-data';

    const handleCancelCreate = () => {
        setIsModalVisible(false);
        setIsEdit(false)
    }

    const updateStaff =()=>{
      setIsEdit('true')
      setTmpMission(staff.mission)
    }
    const deleteStaff =()=>{
      reqBearer.delete(`/staff/${staff._id}`)
      .then(()=>{
        getAllStaff();
        setIsModalVisible(false)
      })
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish=()=>{
        let coordArray=[]
        getCoordonnees&& coordArray.push(getCoordonnees)
        const caLength = Object.keys(ca).length;
        const gradeLength = Object.keys(grade).length;
        const getCoordonneesLength = Object.keys(getCoordonnees).length
        const data={
            ca: caLength===0?staff.ca: ca,
            grade: gradeLength===0? staff.grade:grade,
            mission: tmpMission,
            coordonnees: getCoordonneesLength===0?staff.coordonnees:getCoordonnees
        }
        const form = new FormData()
        form.append('image', image);
        form.append('data', JSON.stringify(data))
        reqBearer.put(`/staff/${staff._id}`, form, headers)
            .then(()=>{
                getAllStaff()
                setIsEdit(false)
                setIsModalVisible(false)
                setMessageError('')
                setTmpMission('')
        })
        .catch((error)=>{
            error.response.data.error?
            setMessageError(error.response.data.error)
            :setMessageError("une erreur est survenue, vérifier la taille de votre fichier")        
        }) 
    }


    const updateGrade=(e)=>{
        setGrade(e?e.target.value:staff.grade)
    }
    const updateCoordonnees=(e)=>{
        setGetCoordonnees(e.target.value)
    }
    const updateCa=(e)=>{
        setCa(e?e:staff.ca)
    }
    const normFile = (e)=>{
        setImage(e.file?e.file:staff.imageUrl)
    }

    const deleteMission=(e)=>{
        let i = e.currentTarget.getAttribute('data-index');
        tmpMission.splice(i, 1)
        e.currentTarget.parentNode.setAttribute('class', 'inputToDelete');
    }

  const editMission=(e)=>{
        let i = e.target.getAttribute('data-index');
        tmpMission.splice(i, 1, e.target.value)
    } 
  const checkMission=(e)=>{
        setNewMission(e.target.value)
    } 

    const addMission=()=>{
        if(newMission.length>0){
            let foundEl=tmpMission.find((el)=>el === newMission)
            if(!foundEl){ 
                tmpMission.push(newMission)
              
      }  
      setSeeAddMission(false)}
    }
   
   const checkAddMission=()=>{
    setSeeAddMission(true)
   } 
   
    return (
        <>
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
                    
                    {isEdit
                    ?<div>
                        <h2> {staff.user.firstName} {staff.user.lastName.toUpperCase()}</h2>
                        <h3>Profil</h3>
                    <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                   label="Membre du conseil d'administration"
                    initialValue={staff.ca}
                        name="ca"          
                    >
                        <Cascader onChange ={updateCa}     
                        options={[
                            {value:true, 
                            label:"OUI"},
                            {value:false, 
                            label:"NON"}
                        ]}/>
                    </Form.Item>
                   <Form.Item
                   label="ROLE"
                    initialValue={staff.grade}
                    name="lastName"                         
                    onChange ={updateGrade}
                    >
                        <Input/>
                    </Form.Item>
                    <div>Adresse: {staff.user.adress} {staff.user.city}</div>
                    <a href="https://www.google.fr/maps" alt="google map" target="_blank" rel="noreferrer">Google Maps</a>
                    <Form.Item
                    label="Coordonnées"
                    initialValue={staff.coordonnees}
                    name="coordonnees"                         
                    onChange ={updateCoordonnees}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload 
                        name="image" 
                        listType="picture"  
                        maxCount = {1}
                        beforeUpload="false"
                    >
                        <Button icon={<UploadOutlined />}>Télécharger une image</Button>
                           <div>La taille de la photo ne doit pas dépasser 2Mo</div>  
                           <a href='https://www.resizepixel.com/fr' alt="réduire la taille" rel="noreferrer" target="_blank">réduire la taille</a>                  
                        </Upload>
                    </Form.Item> 
                   
                    </Form>
                   
                    <h3>Missions</h3>
                        {tmpMission&& tmpMission.map((m, index)=><div key={index} className="updateMission">
                            
                            <Form>
                                <div className='checkMission' >
                                    <Form.Item initialValue={m}  onChange={editMission}  >
                                        <TextArea defaultValue={m} rows={1} data-index={index}></TextArea>
                                    </Form.Item> 
                                    <Button type='text' data-index={index} onClick={deleteMission} ><DeleteOutlined /></Button>
                                </div> 
                            </Form>
                            </div>)}
                   
                                  {seeAddMission?
                                  <Form
                                onFinish={addMission}>
                            <Form.Item onChange={checkMission}>
                                <div className='addMission'>
                                    <Input />
                                    <Button onClick={addMission}>+</Button>
                                </div>
                            </Form.Item>
                        </Form>
                        :<Button onClick={checkAddMission}>Ajouter une mission</Button>}  
                        <div className='modifyStaff'>
                            <Button key="submit" type="primary" onClick={onFinish} >Enregistrer les modifications</Button>
                        </div>
                       {messageError&& <div className="message-error">Erreur: {messageError}</div>}  
                           
                       
                 </div>
                    :<div className='staffProfil'>
                      
                        <h3 className="staffProfil__ligne staffProfil__ligne--name">
                            {staff.user.firstName} {staff.user.lastName.toUpperCase()}
                        </h3>
                        <div className="staffProfil__ligne staffProfil__ligne--ca">Conseil d'administration: {staff.ca?"OUI":"NON"}</div>
                        <div className='staffProfil__ligne staffProfil__ligne--grade'>ROLE: {staff.grade}</div>
                        <div className="staffProfil__ligne staffProfil__ligne--mission">MISSIONS: 
                            {staff.mission.map((mission)=>(<ul className='staffProfil__ligne staffProfil__ligne--mis' key={mission}>
                                <li>{mission}</li>
                            </ul>))}
                        </div>
                        <img className='staffProfil__ligne staffProfil__ligne--photo' src={staff.imageUrl} alt="profil" />
                        <div className='adminRights-button'>
                        <Button onClick={updateStaff}>Modifier</Button>
                        <Button  onClick={deleteStaff}>Supprimer du conseil d'administration</Button>
                    </div>
                   
                </div>
                }
            </Modal>
   </> 
    );
};

export default UpdateStaff;