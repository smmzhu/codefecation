import * as React from 'react';
import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Alert, Image } from 'react-native';
import MiniInfoBox from '../components/miniInfoBox.jsx';
import SlidingPanel from "../components/SlidingPanel.jsx"; // yarn add rn-sliding-up-panel
import Map from '../components/Map.jsx';

function HomeScreen2({ navigation }) {
    const [currPtInfoActive, setCurrPtInfoActive] = useState("none");
    const [lastPtInfo, setLastPtInfo] = useState("none");
    const [activeFlag, setActiveFlag] = useState(false); //this goes up if the currPt goes from none to something, then it goes back to false
    var mapPts = [{id: 0, coordinates:{lat: 34.414425, long: -119.848945}, name : "Public Urination Tub", rating: 5},
                  {id: 1, coordinates:{lat: 34.404834, long: -119.844177}, name : "Achilly", rating: 1},
                  {id: 2, coordinates:{lat: 34.409038, long: -119.846123}, name : "Random Point A", rating: 3},
                  {id: 3, coordinates:{lat: 34.418058, long: -119.842153}, name : "Random Point B", rating: 2}];
    return (
      <SafeAreaView style={stylesMap.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 1 }}>
        <Button 
        title="Sign Out"
        onPress={() => Alert.alert('Haha, you wish! You\'re stuck here forever!')}
        />
        <Button 
        title="Can't Find a Bathroom?"
        onPress={() => navigation.navigate('BathroomRequest', {navigation: navigation})}
        />
        </View>
        <Map mapPts = {mapPts} setCurrPtInfoActive = {setCurrPtInfoActive} activeFlag = {activeFlag} setActiveFlag = {setActiveFlag} lastPtInfo = {lastPtInfo} setLastPtInfo = {setLastPtInfo}/>
        <MiniInfoBox name = {lastPtInfo.name} isActive = {currPtInfoActive != "none"} setCurrPtInfoActive = {setCurrPtInfoActive} activeFlag = {activeFlag} setActiveFlag = {setActiveFlag} navigation = {navigation}/>
        <Image source={require('../assets/marker.png')} style={{width: 50, height: 50}}/>
        <StatusBar style="auto" />
        <SlidingPanel color = '#9f8170' navigation = {navigation}>
        </SlidingPanel>
      </SafeAreaView>
    );
}

export default HomeScreen2;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const stylesMap = StyleSheet.create({
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