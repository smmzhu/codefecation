import * as React from 'react';
// import { Button, View, Text } from 'react-native';
// import { Button } from 'react-native';
import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Alert, Image } from 'react-native';
import MiniInfoBox from '../components/miniInfoBox.jsx';
// import SlidingPanel from "./components/SlidingPanel.jsx"; // yarn add rn-sliding-up-panel
import SlidingPanel from "../components/SlidingPanel.jsx"; // yarn add rn-sliding-up-panel
// import React, {useState, useEffect} from 'react';
import Map from '../components/Map.jsx';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import TestBathroomScreen from './screens/TestBathroomScreen.jsx';

function HomeScreen2({ navigation }) {
    const [currPtInfoActive, setCurrPtInfoActive] = useState("none");
    const [lastPtInfo, setLastPtInfo] = useState("none");
    const [activeFlag, setActiveFlag] = useState(false); //this goes up if the currpt goes from none to something, then it goes back to false
    var mapPts = [{id: 0, coordinates:{lat: 34.414425, long: -119.848945}, name : "Public Urination Tub"},
                  {id: 1, coordinates:{lat: 34.404834, long: -119.844177}, name : "Achilly"},
                  {id: 2, coordinates:{lat: 34.409038, long: -119.846123}, name : "Random Point A"},
                  {id: 3, coordinates:{lat: 34.418058, long: -119.842153}, name : "Random Point B"}]
    return (
      <SafeAreaView style={stylesMap.container}>
        <Button 
        title="Codefecation"
        onPress={() => Alert.alert('Simple Button pressed')}
        />
        <Map mapPts = {mapPts} setCurrPtInfoActive = {setCurrPtInfoActive} activeFlag = {activeFlag} setActiveFlag = {setActiveFlag} lastPtInfo = {lastPtInfo} setLastPtInfo = {setLastPtInfo}/>
        <MiniInfoBox name = {lastPtInfo.name} isActive = {currPtInfoActive != "none"} setCurrPtInfoActive = {setCurrPtInfoActive} activeFlag = {activeFlag} setActiveFlag = {setActiveFlag} navigation = {navigation}/>
        <Image source={require('../assets/marker.png')} style={{width: 50, height: 50}}/>
        <StatusBar style="auto" />
        <SlidingPanel color = '#9f8170'>
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