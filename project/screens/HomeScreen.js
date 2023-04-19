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
    const [activeFlag, setActiveFlag] = useState(false); //this goes up if the currpt goes from none to something, then it goes back to false
    var mapPts = [{id: 0, coordinates:{lat: 30, long: -119.848945}, name : "Public Urination Tub"},
                  {id: 1, coordinates:{lat: 31, long: -121.844177}, name : "Achilly"},
                  {id: 2, coordinates:{lat: 32, long: -122.846123}, name : "Random Point A"},
                  {id: 3, coordinates:{lat: 33, long: -123.842153}, name : "Random Point B"},
                  {id: 4, coordinates:{lat: 34, long: -124.848945}, name : "Public Urination Tub"},
                  {id: 5, coordinates:{lat: 35, long: -125.844177}, name : "Achilly"},
                  {id: 6, coordinates:{lat: 30, long: -126.846123}, name : "Random Point A"},
                  {id: 7, coordinates:{lat: 30, long: -127.842153}, name : "Random Point B"},
                  {id: 8, coordinates:{lat: 30, long: -128.848945}, name : "Public Urination Tub"},
                  {id: 9, coordinates:{lat: 30, long: -129.844177}, name : "Achilly"},
                  {id: 10, coordinates:{lat: 30, long: -130.846123}, name : "Random Point A"},
                  {id: 11, coordinates:{lat: 30, long: -131.842153}, name : "Random Point B"},
                  {id: 12, coordinates:{lat: 30, long: -132.848945}, name : "Public Urination Tub"},
                  {id: 13, coordinates:{lat: 4, long: -100}, name : "BOMBERS"},]
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