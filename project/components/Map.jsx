import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { Image } from 'react-native';

export default function Map(props) {
  var bathroomList = props.bathroomList;
  const [currActive, setCurrActive] = useState("none");
  const [mapRegion, setMapRegion] = useState({
    latitude: props.userLoc.latitude,
    longitude: props.userLoc.longitude,
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
  }

var tenClosest = tenClosestCoordinates(bathroomList, [mapRegion.latitude, mapRegion.longitude]);

function tenClosestCoordinates(listOfPoints, constantPoint) {
  // console.log("tenClosestCoordinates");
  const sortedListOfPoints = listOfPoints.sort((a, b) => {
    const distanceA = getDistanceFromLatLonInKm(a.coords.lat, a.coords.long, constantPoint[0], constantPoint[1]);
    const distanceB = getDistanceFromLatLonInKm(b.coords.lat, b.coords.long, constantPoint[0], constantPoint[1]);
    return distanceA - distanceB;
  }); // sort the list of coordinates based on distance from the constant point
  
  return sortedListOfPoints.slice(0, 10); // return the first 10 elements of the sorted list
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
      
      {/* <TouchableOpacity 
        style={styles.RefreshButton}
        onPress={() => tenClosest = tenClosestCoordinates(bathroomList, [mapRegion.latitude, mapRegion.longitude])}>
        <Text style={styles.text}>{"Refresh!"}</Text>
      </TouchableOpacity> */}

      <MapView style={styles.map} 
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='User' >
            <View style={styles.Marker}>
                <Image source={require('../assets/user.png')} style={{width: 50, height: 50}}/>
            </View>
        </Marker>
        {tenClosest.map((marker) => (
        // {bathroomList.map((marker) => (
          <Marker
            key={marker.bathroomID}
            coordinate={{latitude: marker.coords.lat, longitude: marker.coords.long}}
            title={marker.name}
            onPress={()=>{setCurrActive(marker.bathroomID); props.setCurrPtInfoActive(marker); props.setLastPtInfo(marker); 
                          if (props.activeFlag == false){props.setActiveFlag(true);} 
                          // console.log("public clicked"); 
                          }}
          >
            <View style={styles.Marker}>
                <Image source={require('../assets/marker.png')} style={{width: 100, height: 100}}/>
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
    flexGrow: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  Marker: { 
  },
  RefreshButton:{
    backgroundColor: 'red',
    width: '20%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    // position: 'fixed', 
    // top: 0 , // Position at the top
    // left: 0, // Position at the left
  },
  tests: {
    justifyContent: 'center',
  }

});