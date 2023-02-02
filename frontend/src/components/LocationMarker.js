import React, { useEffect, useState } from "react";
import { Marker, useMap, Popup } from "react-leaflet";



import iconRed from "../assets/iconeRed"



  const LocationMarker=()=> {
    const [position, setPosition] = useState(null);
   

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={iconRed}>
        <Popup>Vous êtes ici</Popup>
      </Marker>
    );
  }
  export default LocationMarker