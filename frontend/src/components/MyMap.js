import React, { useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

import LocationMarker from './LocationMarker';
import { staffContext } from '../context/StaffContext';
import LocationStaff from './LocationStaff';

import iconGreen from "../assets/iconeGreen"

const MyMap = () => {
 
  const { staffWithCoord, getAllStaff }=useContext(staffContext);

  useEffect(()=>{
    getAllStaff()
  },[])

    return(
        <>
      
        <MapContainer center={[48.065914, -0.772164]} zoom={9} scrollWheelZoom={false} id="map" height="500">
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
     <LocationMarker/>
   {staffWithCoord&&
    staffWithCoord.map((staff, index)=><LocationStaff key={index} staff={staff}/>)}
   <Marker position={[48.085598080446765, -0.7560736737355223]} icon={iconGreen}>
        <Popup>
          Siège<br/>
          26, rue des Dr Calmette et Guérin<br/>
          Laval
        </Popup>
      </Marker>
      <Marker position={[48.06216969368575, -0.7553524179181977]} icon={iconGreen}>
        <Popup>
          Bureau 227<br/>
          2 bis, Bd Murat<br/>
          Laval
        </Popup>
      </Marker>
  </MapContainer>  
  
        </>
    )
}

export default MyMap;