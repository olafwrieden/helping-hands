import React from 'react'
import './RequestsMap.css'
import MapContainer from './components/MapContainer'

const RequestsMap = () => {
    return (
        <div className="requests-map-div card has-text-centered">
            <h2 className="title has-text-centered">Nearby Requests</h2>
            <div className="map-component-wrapper">
                <MapContainer/>
            </div>
        </div>
    )
}

export default RequestsMap
