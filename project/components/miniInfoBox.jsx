import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';
import {useEffect, useRef} from 'react';
import {Animated} from "react-native";
import {LogBox} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Rating from './Rating';
import Tag from './Tag';
import * as Font from 'expo-font';
import firebase from '../database/firebase';
import verif from '../assets/verif.png';

const MiniInfoBox = (props) => {
  const [disp, setDisp] = useState(useRef(new Animated.ValueXY({x: 0, y: 1})).current); //disp = displacement
  const [open, changeopen] = useState(true);
  const [numRev, setNumRev] = useState(0);

  const flyOutToBottom = () => {
    Animated.timing(disp.y, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }
  const flyInFromBottom = () => {
    Animated.timing(disp.y, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }

  const initialCoords = props.userLocation.latitude + "," + props.userLocation.longitude;
  // console.log(props.toilet);
  const finalCoords = props.toilet.coords.lat + "," + props.toilet.coords.long;

  async function loadFonts() {
    await Font.loadAsync({
      'Comfortaa': require('../assets/fonts/Comfortaa.ttf'),
    });
  };

  function isTimeInRange(time, range) {
    const [start, end] = range.split(' - ');
  
    // Convert start and end times to minutes past midnight
    const startMinutes = convertToMinutes(start);
    const endMinutes = convertToMinutes(end);
    if(startMinutes == endMinutes){
      return true;
    }
  
    // Convert given time to minutes past midnight
    const timeMinutes = convertToMinutes(formatAMPM(time));
    // Check if time falls within range
    if (startMinutes <= endMinutes) {
      return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
    } else {
      return timeMinutes >= startMinutes || timeMinutes <= endMinutes;
    }
  }
  function convertToMinutes(timeString) {
    const [hour, minute] = timeString.split(':');
    let minutes = parseInt(hour) * 60 + parseInt(minute);
  
    // Adjust for AM/PM
    if (timeString.endsWith('PM') && hour !== '12') {
      minutes += 12 * 60;
    } else if (timeString.endsWith('AM') && hour === '12') {
      minutes -= 12 * 60;
    }
  
    return minutes;
  }
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;
    return strTime;
  }
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const distance = getDistanceFromLatLonInKm(props.userLocation.latitude, props.userLocation.longitude, props.toilet.coords.lat, props.toilet.coords.long);
  
  useEffect(() => {
    const time = new Date();
    if (isTimeInRange(time, props.toilet.hours) == false) {
      changeopen(false);
    }
    else {
      changeopen(true);
    }
    
    // const db = firebase.firestore();
    // db.collection("bathrooms").doc(props.toilet.bathroomID).get().then((docSnapshot) => {
    //   if (docSnapshot.exists) {
    //     const bathroomData = docSnapshot.data();
    //     setNumRev(bathroomData.reviews.length);  
    //   }
    // });
    setNumRev(props.toilet.reviews.length);  

    if (props.activeFlag){flyInFromBottom(); props.setActiveFlag(false);};
  }, [props.activeFlag, props.toilet]);
  // console.log(props.userLoc);
  return (
    <Animated.View style={{
      transform: [{
        translateY: disp.y.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 600]})
        }
      ],
      ...styles.modalView
    }}>
      <Pressable
        onPress={() => props.navigation.navigate('Bathroom', {
          bathroomID: props.toilet.bathroomID,
          coords: props.toilet.coords,
          userLoc: props.userLocation,
          name: props.toilet.name,
          address: props.toilet.address,
          tags: props.toilet.tags,
          ratings: props.toilet.ratings,
          reviewSummary: props.toilet.reviewSummary,
          reviews: props.toilet.reviews,
          status: props.toilet.status,
          hours: props.toilet.hours,
        })}
        styles={styles.modal}
      >
        <View style={styles.rowOne}>
          {/* <Text style={styles.modalText}>{props.toilet.name}</Text> */}
          {props.toilet.status.validBathroom ? <Text style={styles.modalText}>{props.toilet.name}  <Image source={verif} style={styles.verif}/> </Text> : <Text style={styles.modalText}>{props.toilet.name}</Text>}
          <View style={styles.hoursection}>
              {open && (
                <View style={styles.opentag}>
                  <Text style={styles.tagText}>Open</Text>
                </View>
              )}
              {!open && (
                <View style={styles.closedtag}>
                  <Text style={styles.tagText}>Closed</Text>
                </View>
              )}
          </View>
          <Pressable
            style={[styles.button, styles.close]}
            onPress={() => {flyOutToBottom(); props.setCurrPtInfoActive("none")}}>
            <FontAwesome name='times' size={30} color='#7D77FF' />
          </Pressable>
        </View>
        
        <View style={styles.rowTwo}>
          <Rating Rating={0} toilet = {props.toilet} style={{marginTop: 5, marginBottom: 5}} />
          {/* <Text style={styles.numReviews}>({numRev} reviews)</Text> */}
          {numRev < 2 ? <Text style={styles.numReviews}>({numRev} review)</Text> : <Text style={styles.numReviews}>({numRev} reviews)</Text>}
        </View>

        <View style={styles.rowThree}>
          <Text style = {styles.distance}>{distance.toFixed(2)} km • {props.toilet.hours}</Text>

        </View>

        <View style={styles.rowFour}>
          <View style={styles.tagsContainer}>
              {props.toilet.tags && props.toilet.tags.map((tag) => (
                <Tag tag={tag} key={tag}/>
              ))}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  ); 
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginLeft: '20%',
    marginBottom: '2.5%',
    position: 'absolute',
    height: '30%',
    alignSelf: 'center',
    bottom: 100,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal: {
    flexDirection: 'column',
    justifyContent: 'stretch',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'blue',
  },

  rowOne: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: '100%',
    height: '30%',
    // backgroundColor: 'orange',
  },
  modalText: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
    fontFamily: "Comfortaa",
    maxWidth: '60%',
    flexWrap: 'wrap',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  verif: {
    width: 30,
    height: 30,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    resizeMode: 'contain',
    // backgroundColor: '#7D77FF',
    // marginLeft: 10,
    // absolutePosition: 'absolute',
  },
  hoursection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    // justifyContent: 'flex-end',
  },
  opentag: {
    marginTop: 0,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#66ffc2',
    borderRadius: 5,
    opacity: 1,
  },
  closedtag: {
    marginTop: 0,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ff9999',
    borderRadius: 5,
    opacity: 1,
  },
  tagText: {
    fontSize: 16,
    fontFamily: "Comfortaa",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  rowTwo: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: '100%',
    // backgroundColor: 'red',
    height: '20%',
    alignItems: 'center',
    paddingBottom: 10,
    paddingLeft: 7,
  },
  numReviews: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "Comfortaa",
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  rowThree: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: '100%',
    // backgroundColor: 'purple',
    height: '20%',
    alignItems: 'center',
    paddingLeft: 10,
  },
  distance:{
    fontSize: 16,
    fontFamily: "Comfortaa",
  },
  statusText:{
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Comfortaa",
  },

  rowFour: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: '100%',
    // backgroundColor: 'green',
    height: '30%',
    paddingLeft: 7,
    overflow: 'hidden',
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
});

export default MiniInfoBox;
