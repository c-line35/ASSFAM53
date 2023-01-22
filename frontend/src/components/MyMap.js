import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker} from 'react-leaflet'

import LocationMarker from './LocationMarker';
import { staffContext } from '../context/StaffContext';
import LocationStaff from './LocationStaff';



const MyMap = () => {
 
  const { allStaff }=useContext(staffContext);

    return(
        <>
      
        <MapContainer center={[48.065914, -0.772164]} zoom={10} scrollWheelZoom={false} id="map">
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LocationMarker/>
   {allStaff&&
    allStaff.map((staff, index)=><LocationStaff key={index} staff={staff}/>)}
  
  </MapContainer>  
  
        </>
    )
}

export default MyMap;