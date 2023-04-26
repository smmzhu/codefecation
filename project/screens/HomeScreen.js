import * as React from 'react';
import {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Alert, Image } from 'react-native';
import MiniInfoBox from '../components/miniInfoBox.jsx';
import SlidingPanel from "../components/SlidingPanel.jsx"; // yarn add rn-sliding-up-panel
import Map from '../components/Map.jsx';
import userLocation from '../hooks/getUserPos.jsx';

function HomeScreen({ navigation }) {
    const [currPtInfoActive, setCurrPtInfoActive] = useState("none");
    const [lastPtInfo, setLastPtInfo] = useState("none");
    const [activeFlag, setActiveFlag] = useState(false); //this goes up if the currpt goes from none to something, then it goes back to false
    const [userLoc, setUserLoc] = useState({latitude: 34.404834, longitude: -119.844177,})
    const mapPts = [
      {
        "bathroomID": "bathroom_001",
        "coords": {
          "lat": 34.414425,
          "long": -119.848945,
        },
        "name": "Engineering Science Building",
        "address": "123 Main St, New York, NY",
        "tags": [
          "Female",
          "Smells good"
        ],
        "ratings": {
          "overallRating": 4.5,
          "cleanRating": 5,
          "boujeeRating": 3.5
        },
        "reviews": [
          {
            "reviewID": "review_001",
            "userID": "user_001",
            "overallRating": 4,
            "cleanRating": 5,
            "boujeeRating": 3,
            "reviewText": "This bathroom was super clean and smelled great! The only downside was that it didn't have any fancy amenities."
          },
          {
            "reviewID": "review_002",
            "userID": "user_002",
            "overallRating": 5,
            "cleanRating": 5,
            "boujeeRating": 5,
            "reviewText": "Wow, this bathroom was amazing! It had everything I needed and more. I would definitely come back here again."
          }
        ]
      },
      {
        "bathroomID": "bathroom_002",
        "coords": {
          "lat": 34.404834,
          "long": -119.844177
        },
        "name": "The Comfort Zone",
        "address": "456 Elm St, New York, NY",
        "tags": [
          "Male",
          "Non-gendered"
        ],
        "ratings": {
          "overallRating": 3,
          "cleanRating": 2,
          "boujeeRating": 4
        },
        "reviews": [
          {
            "reviewID": "review_003",
            "userID": "user_003",
            "overallRating": 3,
            "cleanRating": 2,
            "boujeeRating": 4,
            "reviewText": "This bathroom was just okay. It wasn't very clean and it didn't have any special features."
          }
        ]
      },
      {
        "bathroomID": "bathroom_003",
        "coords": {
          "lat": 34.409038,
          "long": -119.846123,
        },
        "name": "The Lavatory",
        "address": "789 Oak St, New York, NY",
        "tags": [
          "Female",
          "Smells good"
        ],
        "ratings": {
          "overallRating": 4,
          "cleanRating": 4,
          "boujeeRating": 4
        },
        "reviews": [
          {
            "reviewID": "review_004",
            "userID": "user_004",
            "overallRating": 4,
            "cleanRating": 4,
            "boujeeRating": 4,
            "reviewText": "This bathroom was very nice and clean. I appreciated the attention to detail and the pleasant fragrance."
          }
        ]
      }
    ]
    useEffect(
      () => {(async () => {
        const pos = await userLocation();
        console.log("wee", pos);
        await setUserLoc(userLocation());
      })()}
    , []);
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
        <Map mapPts = {mapPts} userLoc = {userLoc} setCurrPtInfoActive = {setCurrPtInfoActive} activeFlag = {activeFlag} setActiveFlag = {setActiveFlag} lastPtInfo = {lastPtInfo} setLastPtInfo = {setLastPtInfo}/>
        <MiniInfoBox toilet = {lastPtInfo} isActive = {currPtInfoActive != "none"} setCurrPtInfoActive = {setCurrPtInfoActive} activeFlag = {activeFlag} setActiveFlag = {setActiveFlag} navigation = {navigation}/>
        <Image source={require('../assets/marker.png')} style={{width: 50, height: 50}}/>
        {/*<MiniInfoBox tags={lastPtInfo.tags} name = {lastPtInfo.name} isActive = {currPtInfoActive != "none"} setCurrPtInfoActive = {setCurrPtInfoActive} activeFlag = {activeFlag} setActiveFlag = {setActiveFlag} navigation = {navigation}/>*/}
        <StatusBar style="auto" />
        <SlidingPanel color = '#9f8170' navigation = {navigation}>
        </SlidingPanel>
      </SafeAreaView>
    );
}

export default HomeScreen;

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
