import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Alert, Image } from 'react-native';
import SlidingPanel from "./components/SlidingPanel.jsx"; // yarn add rn-sliding-up-panel
// import MapView from 'react-native-maps';
// import Map2 from './components/Map2.jsx';
// <MapSection location={location} zoomLevel={17} /> {}
import Map from './components/Map.jsx';

export default function App() {
  // <Marker 
  //         coordinate={{latitude: 34.404834, longitude: -119.844177}} 
  //         title='Achilly' onPress={()=>{console.log("no dates b4 finalz")}}>
  //           <View style={styles.Marker}>
  //               <Image source={require('../assets/marker.png')} style={{width: 50, height: 50}}/>
  //               {/* <Button title='achilly' /> */}
  //           </View>
  //         </Marker>
  var mapPts = [{id: 0, coordinates:{lat: 34.414425, long: -119.848945}, name : "Public Urination Tub"},
                {id: 1, coordinates:{lat: 34.404834, long: -119.844177}, name : "Campus Point"},
                {id: 2, coordinates:{lat: 34.409038, long: -119.846123}, name : "Random Point A"},
                {id: 3, coordinates:{lat: 34.418058, long: -119.842153}, name : "Random Point B"}]
  return (
    <SafeAreaView style={styles.container}>
      <Button 
      title="Codefecation"
      onPress={() => Alert.alert('Simple Button pressed')}
      />
      <Map mapPts = {mapPts}/>
      <Image source={require('./assets/marker.png')} style={{width: 50, height: 50}}/>
      <StatusBar style="auto" />
      <SlidingPanel color = '#9f8170'>
      </SlidingPanel>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    width: 50,
    height: 50,
  }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import React, {useState, useEffect} from 'react';
// import MapView, {Marker} from 'react-native-maps';
// import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
// import * as Location from 'expo-location';


// export default function App() {
//   const [mapRegion, setMapRegion] = useState({
//     latitude: 34.404834,
//     longitude: -119.844177,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

// const userLocation = async () => {
//   let { status } = await Location.requestForegroundPermissionsAsync();
//   if (status !== 'granted') {
//     setErrorMsg('Permission to access location was denied');
//     return;
//   }
//   let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
//   setMapRegion({
//     latitude: location.coords.latitude,
//     longitude: location.coords.longitude,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });
//   console.log(location.coords.latitude, location.coords.longitude);
// }

// useEffect(() => {
//   userLocation();
// }, []);
//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} 
//         region={mapRegion}
//       >
//         <Marker coordinate={mapRegion} title='Marker'/>
//       </MapView>
//       <Button title='Get Location' onPress={userLocation}/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// });