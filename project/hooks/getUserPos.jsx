import * as Location from 'expo-location';
const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    return ({latitude:location.coords.latitude, longitude:location.coords.longitude});
}

export default userLocation;
  