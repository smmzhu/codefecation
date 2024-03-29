import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ShowMap = ({ longitude, latitude }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          longitude: longitude,
          latitude: latitude,
          latitudeDelta: 0.0922/13,
          longitudeDelta: 0.0421/13,
        }}
      >
        <Marker
          coordinate={{ longitude: longitude, latitude: latitude }}
          title={'Your Location'}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});

export default ShowMap;
