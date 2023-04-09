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

useEffect(() => {
  userLocation();
}, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='User' onPress={()=>{console.log("chris: im kickin out yall cuz rpt--")}}>
            <View style={styles.Marker}>
                <Image source={require('../assets/user.png')} style={{width: 50, height: 50}}/>
            </View>
        </Marker>
        
        {/* <Marker 
          coordinate={{latitude: 34.404834, longitude: -119.844177}} 
          title='Achilly' onPress={()=>{console.log("no dates b4 finalz")}}>
            <View style={styles.Marker}>
                <Image source={require('../assets/marker.png')} style={{width: 50, height: 50}}/>
                // <Button title='achilly' />
            </View>
          </Marker> */}
        {mapPts.map((marker) => (
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
      {/* <Button title='Get Location' onPress={userLocation}/> */}
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