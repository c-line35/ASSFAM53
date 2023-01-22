
import React from "react";
import { Marker, Popup } from "react-leaflet";



import iconBlue from "../assets/iconeBlue"



  const LocationStaff=({ staff })=> {
    let lat;
    let long;

const getCoordonnees=()=>{
  lat = staff.coordonnees[0].split(', ')[0]
  long = staff.coordonnees[0].split(', ')[1]

}

staff.coordonnees&&getCoordonnees()
return(
        <>
       {staff.coordonnees&&
      <Marker position={[Number(lat), Number(long)]} icon={iconBlue}>

        <Popup>
          {staff.user.firstName} {staff.user.lastName}<br/>
          {staff.user.email}
        </Popup>
      </Marker>} 
      </>
    );
  }
  export default LocationStaff