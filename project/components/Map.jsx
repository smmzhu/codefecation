import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'

const location = {
    address: 'Lagoon Rd, Isla Vista, California',
    lat: 34.404834,
    lng: -119.844177,
  }

const Map = ({ location, zoomLevel }) => (
    <div className="map">
        <h2 className="map-h2">Come Visit Us At Our Campus</h2>
  
    <div className="google-map">
        <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={location}
            defaultZoom={zoomLevel}
        >
                <LocationPin
                    lat={location.lat}
                    lng={location.lng}
                    text={location.address}
                />
            </GoogleMapReact>
        </div>
    </div>
)