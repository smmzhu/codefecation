import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {Dimensions} from 'react-native';

const MapChoose = (props) => {
  const [selectedLocation, setSelectedLocation] = useState(props.defaultPos);  

  const handleMapPress = (event) => {
    setSelectedLocation({
      longitude: event.nativeEvent.coordinate.longitude,
      latitude: event.nativeEvent.coordinate.latitude,
    });
  };

  const handleConfirmLocation = () => {
    props.setLatitude(selectedLocation.latitude);
    props.setLongitude(selectedLocation.longitude);
    // You can pass the selectedLocation to a parent component or make an API call here to update the location in a database
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{minHeight: Dimensions.get('window').height*0.2,...styles.map}}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 34.414425,
          longitude: -119.848945,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
          >
            <View style={styles.Marker}>
                <Image source={require('../assets/marker.png')} style={{width: 50, height: 50}}/>
            </View>
          </Marker>
        )}
      </MapView>
      <View style={styles.buttonContainer}>
          <TouchableOpacity
          style={styles.returnButton}
          onPress={handleConfirmLocation}
          >
          <Text style={styles.returnButtonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
      {/* {selectedLocation && (
        <View style={styles.buttonContainer}>
          <Button title="Confirm Location" onPress={handleConfirmLocation} />
        </View>
      )} */}
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
    height: '95%',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 0,
    width: '80%',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 16,
  },
  Marker: { 
  },
  returnButton: {
    marginTop: 0,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F5A623',
    borderRadius: 5,
    opacity: 1,
  },
  returnButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  }
});

export default MapChoose;
