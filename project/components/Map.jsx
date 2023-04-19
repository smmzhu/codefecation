import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import * as Location from 'expo-location';
import { Image } from 'react-native';


export default function Map(props) {
  var mapPts = props.mapPts;
  const [currActive, setCurrActive] = useState("none");
    const [mapRegion, setMapRegion] = useState({
    latitude: 34.404834,
    longitude: -119.844177,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

const userLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }
  let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
  setMapRegion({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  console.log(location.coords.latitude, location.coords.longitude);
}

// compare points to mapRegion.latitude and mapRegion.longitude
// show ten closest points
// how to access lat and long of points in mapPts

var tenClosest = tenClosestCoordinates(mapPts, [mapRegion.latitude, mapRegion.longitude]);
// console.log(tenClosest);

function tenClosestCoordinates(coordinates, constantPoint) {
  const sortedCoordinates = coordinates.sort((a, b) => {
    const distanceA = getDistanceFromLatLonInKm(a[1], a[0], constantPoint[1], constantPoint[0]);
    const distanceB = getDistanceFromLatLonInKm(b[1], b[0], constantPoint[1], constantPoint[0]);
    return distanceA - distanceB;
  }); // sort the list of coordinates based on distance from the constant point

  return sortedCoordinates.slice(0, 10); // return the first 10 elements of the sorted list
}

// Helper function to calculate distance between two sets of coordinates using the Haversine formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}


useEffect(() => {
  userLocation();
}, []);
  return (
    <View style={styles.container}>
      {/* <Button title='Get Location' onPress={userLocation}/> */}
      <MapView style={styles.map} 
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='User' onPress={()=>{console.log("chris: im kickin out yall cuz rpt--")}}>
            <View style={styles.Marker}>
                <Image source={require('../assets/user.png')} style={{width: 50, height: 50}}/>
            </View>
        </Marker>
        {tenClosest.map((marker) => (
        // {mapPts.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{latitude: marker.coordinates.lat, longitude: marker.coordinates.long}}
            title={marker.name}
            onPress={()=>{setCurrActive(marker.id); props.setCurrPtInfoActive(marker); props.setLastPtInfo(marker); 
                          if (props.activeFlag == false){props.setActiveFlag(true);} 
                          console.log("public clicked"); 
                          console.log(marker);}}
          >
            <View style={styles.Marker}>
                <Image source={require('../assets/marker.png')} style={{width: 50, height: 50}}/>
            </View>
          </Marker>
        ))}
            
      </MapView>
      {/* <Button title='Get Location' onPress={userLocation}/> SAVING THIS FOR ADDING A RELOAD SWIPE*/}
    </View>
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
  Marker: { 
  }

});