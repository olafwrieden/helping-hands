import React from 'react'
import '../RequestsMap.css'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { useAuth } from "../../App/Authentication";


const style = {
    width: '100%',
    height: '100%',
    transform: 'TranslateX(0)'
  }

const MapContainer = (props) => {
    const { isAuthed, user } = useAuth();
    const address = user.address
    //geocode address to lat/long coordinates
    //placeholder:
    const akl = {
        lat: -36.848461,
        lng: 174.763336
    }
    const { lat, lng } = akl
    return (
        <Map 
            google={props.google} 
            zoom={13}  
            initialCenter={{lat, lng}}
            style={style}>
 
        {/* <Marker position={{lat: 37.778519, lng: -122.405640}} /> */}
      </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: ('')
  })(MapContainer)
