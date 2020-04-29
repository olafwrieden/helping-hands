import React, { useState, useEffect } from 'react'
import '../RequestsMap.css'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import { useAuth } from '../../App/Authentication'
import Geocode from 'react-geocode'
Geocode.setApiKey('AIzaSyALJlUnHvzueMf92A0kFkVnxl24GW_xTDU')


const style = {
    width: '100%',
    height: '100%',
    transform: 'TranslateX(0)'
  }

const MapContainer = ({pinsArr, google}) => {
    const { user } = useAuth();
    const {address, city, zipCode} = user
    const [userCoordinates, setUserCoordinates] = useState({initLat: null, initLng: null})
    const [coordsArray, setCoordsArray] = useState([])
    const { initLat, initLng } = userCoordinates
    //geocode address to lat/long coordinates
    //placeholder:
    useEffect(() => {
        const geoCoder = async () => {
            try {
            const fetchGeocode = await Geocode.fromAddress(`${address}, ${city}, ${zipCode}`)
            const { lat, lng } = fetchGeocode.results[0].geometry.location
            setUserCoordinates({initLat: lat, initLng: lng})
            const geocodeArray = []
            await pinsArr.map(async item => {
                const fetchGeocoder = await Geocode.fromAddress(`${item.address}, ${item.city}, ${item.zipCode}`)
                const { lat, lng } = fetchGeocoder.results[0].geometry.location
                console.log("coordinates for item in array, ", lat, lng)
                item.coords = {lat, lng}
                geocodeArray.push(item)
                setCoordsArray([...coordsArray, ...geocodeArray])
            })
            } catch(err) {
                console.log(err)
            }
        }
        geoCoder()
    }, [])
    coordsArray.length === 2 && console.log(coordsArray)
    return (
        <>
        {initLat && <Map 
            google={google} 
            zoom={14}  
            initialCenter={{lat: initLat, lng: initLng}}
            style={style}>
        {
            coordsArray.length > 0 && 
            coordsArray.map((item, idx) => 
                <Marker key={`${item}${idx}`} position={item.coords} />
            )
        }
        {/* <Marker position={{lat: 37.778519, lng: -122.405640}} /> */}
        </Map>}
        </>
    )
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyALJlUnHvzueMf92A0kFkVnxl24GW_xTDU')
  })(MapContainer)
