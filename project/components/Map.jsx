import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import * as Location from 'expo-location';
import { Image } from 'react-native';

export default function Map() {
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

useEffect(() => {
  userLocation();
}, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='User'>
            <View style={styles.Marker}>
                <Image source={require('../assets/marker.png')} style={{width: 50, height: 50}}/>
            </View>
        </Marker>
        
        <Marker 
          coordinate={{latitude: 34.404834, longitude: -119.844177}} 
          title='Achilly'>
            <View style={styles.Marker}>
                <Image source={require('../assets/marker.png')} style={{width: 50, height: 50}}/>
                <Button title='achilly' onPress={console.log("no dates b4 finalz")}/>
            </View>
          </Marker>
            
      </MapView>
      <Button title='Get Location' onPress={userLocation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '95%',
  },
  Marker: { 
  }

});