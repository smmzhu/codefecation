import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {Dimensions} from 'react-native';

const MapChoose = (props) => {
  const [selectedLocation, setSelectedLocation] = useState({longitude:props.defaultPos.longitude, latitude:props.defaultPos.latitude});  
  useEffect(() => {
    handleConfirmLocation();
  }, [selectedLocation]);
  const handleMapPress = (event) => {
    setSelectedLocation({
      longitude: event.nativeEvent.coordinate.longitude,
      latitude: event.nativeEvent.coordinate.latitude,
    });
  };

  const handleConfirmLocation = () => {
    props.setLatitude(selectedLocation.latitude);
    props.setLongitude(selectedLocation.longitude);
    // console.log(selectedLocation);
    // You can pass the selectedLocation to a parent component or make an API call here to update the location in a database
  };

  const sus = (event) => {
    handleMapPress(event);
    handleConfirmLocation();
  }
  return (
    <View style={styles.container}>
      <MapView
        style={{minHeight: Dimensions.get('window').height*0.25,...styles.map}}
        onPress={sus}
        initialRegion={{
          // latitude: 34.414425,
          // longitude: -119.848945,
          latitude: props.defaultPos.latitude,
          longitude: props.defaultPos.longitude,
          latitudeDelta: 0.0922/13,
          longitudeDelta: 0.0421/13,
        }}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
          >
            <TouchableOpacity 
            style={styles.Marker}
            onPress={handleConfirmLocation}>
                <Image source={require('../assets/marker.png')} style={{width: 100, height: 100}}/>
            </TouchableOpacity>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  map: {
    width: '100%',
    height: '100%',
    marginBottom: 20,
    borderRadius: 10,
  },
  tagText: {
    fontSize: 16,
  },
  Marker: { 
  },
});

export default MapChoose;
