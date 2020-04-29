import React, { useState } from 'react'
import './RequestsMap.css'
import MapContainer from './components/MapContainer'
import ReqDetailsCard from './components/ReqDetailsCard'
import { requests } from '../../seedRequests.json'

const RequestsMap = () => {
    const pinsArr = requests.filter(item => item.status === 'pending')
    const [clickedItem, setClickedItem] = useState(null)
    const pinClickHandler = item => {
        setClickedItem(item)
    }

    return (
        <div className="requests-map-div card has-text-centered">
            <h2 className="title has-text-centered">Nearby Requests</h2>
            {pinsArr.length > 0 ? 
            <div>
            <div className="map-component-wrapper">
                <MapContainer pinsArr={pinsArr} pinClickHandler={pinClickHandler}/>
            </div>
            {clickedItem && <ReqDetailsCard clickedItem={clickedItem} setClickedItem={setClickedItem}/>}
            </div> 
            : <div className="card">
                <h2 className="title">No requests to display</h2>
              </div>
            }
        </div>
    )
}

export default RequestsMap
