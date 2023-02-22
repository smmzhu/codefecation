// import React from 'react'
// import GoogleMapReact from 'google-map-react'
// //import './map.css'

// //import 'key.env'
// // import { Icon } from '@iconify/react'
// // import locationIcon from '@iconify/icons-mdi/map-marker'

// const location = {
//     address: 'Lagoon Rd, Isla Vista, California',
//     lat: 34.404834,
//     lng: -119.844177,
// }

// const Map = ({ location, zoomLevel }) => (
//     <div className="map">
//         <h2 className="map-h2">Come Visit Us At Our Campus</h2>
  
//     <div className="google-map">
//         <GoogleMapReact
//             bootstrapURLKeys={{ key: (key.env.REACT_APP_GOOGLE_MAPS_API_KEY) }}
//             defaultCenter={location}
//             defaultZoom={zoomLevel}
//         >
//             <LocationPin
//                 lat={location.lat}
//                 lng={location.lng}
//                 text={location.address}
//             />
//         </GoogleMapReact>
//         </div>
//     </div>
// )

// // const LocationPin = ({ text }) => (
// //     <div className="pin">
// //       <Icon icon={locationIcon} className="pin-icon" />
// //       <p className="pin-text">{text}</p>
// //     </div>
// // )

// export default Map;