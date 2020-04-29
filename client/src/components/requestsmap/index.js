import React from 'react'
import './RequestsMap.css'
import MapContainer from './components/MapContainer'
import { requests } from '../../seedRequests.json'

const RequestsMap = () => {
    
    const pinsArr = requests.filter(item => item.status === 'pending')
    return (
        <div className="requests-map-div card has-text-centered">
            <h2 className="title has-text-centered">Nearby Requests</h2>
            <div className="map-component-wrapper">
                <MapContainer pinsArr={pinsArr}/>
            </div>
        </div>
    )
}

export default RequestsMap
