import React, {useState, useEffect} from 'react';
import { View, Text, Image, Button, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { StyleSheet } from 'react-native';
import Rater from '../components/Rater.jsx';
import Rating from '../components/Rating.jsx';
import RevSummary from '../components/RevSummary.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import Review from '../components/Review.jsx';
import ShowMap from '../components/ShowMap.jsx';
import Tag from '../components/Tag.jsx';
import BathroomVerif from '../components/BathroomVerif.jsx';
import { LinearGradient } from 'expo-linear-gradient';
import { Button as PaperButton } from "react-native-paper";
import { TextInput as PaperTextInput } from "react-native-paper";
import * as Font from 'expo-font';
import firebase from '../database/firebase';
import verif from '../assets/verif.png';
import awsconfig from '../src/aws-exports';
import Amplify from '@aws-amplify/core';
import {Storage} from 'aws-amplify';
Amplify.configure(awsconfig);

const BathroomScreen = ({ route, navigation }) => {
  
    const {bathroomID, coords, name, address, hours, tags, reviewSummary, ratings, reviews, status, userLoc} = route.params; //assume that bathroom ratings is a json
    const [open, changeopen] = useState(true);
    const [numRev, setNumRev] = useState(0);

    const initialCoords = userLoc.latitude + "," + userLoc.longitude;
    const finalCoords = coords.lat + "," + coords.long;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${initialCoords}&destination=${finalCoords}`;
    function openMap() {
      Linking.openURL(url);
    }
    async function loadFonts() {
      await Font.loadAsync({
        'Comfortaa': require('../assets/fonts/Comfortaa.ttf'),
      });
    };
  
    function componentDidMount() {
      this.loadFonts();
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
    const distance = getDistanceFromLatLonInKm(userLoc.latitude, userLoc.longitude, coords.lat, coords.long);
    useEffect(() => {
      const time = new Date();
      if (isTimeInRange(time, hours) === false) {
        //console.log("closed");
        changeopen(false);
      }
      // const db = firebase.firestore();
      // db.collection("bathrooms").doc(bathroomID).get().then((docSnapshot) => {
      //   if (docSnapshot.exists) {
      //     const bathroomData = docSnapshot.data();
      //     setNumRev(bathroomData.reviews.length);  
      //   }
      // })
      setNumRev(reviews.length);
    }, []);


    let sign = '<';
    return (
    <LinearGradient 
      colors={['#F0F3FB', '#F0F3FB']} 
      start={{ x: 0.2, y: 0.2}} 
      end={{ x: 1, y: 1}}
      style={styles.containerView}

    >
      <SafeAreaView style={styles.megaConatiner}>
        {/* <View style={styles.reviewBox}> */}
          <View style={{height:'7%', width:'100%', paddingLeft:'2%', marginTop: '3%', flexDirection:'row'}}>
              <PaperButton onPress={() => navigation.goBack()} style = {{backgroundColor:"transparent", height: 50, width: 50, justifyContent: "flex-start", alignSelf: "flex-end", resizeMode: "contain"}}>
                <Image source={require('../assets/backButton.png')} style={styles.logoView}/>
              </PaperButton>
          </View>
            {/* <PaperButton
              style={{
                width: '8%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                // alignSelf: 'center',
                backgroundColor: '#7D77FF',
              }}
                labelStyle={styles.text}
                mode="contained" 
                onPress={() => navigation.goBack()}
            >
              {sign} */}
              {/* <Image source={require('../assets/returnButton.png')} style={{width: 20, height: 20}}/>       */}
            {/* </PaperButton> */}

          <ScrollView>

            {/* <View style={styles.container}> */}
                <View style={styles.component}>
                  <View style={styles.header}>
                      {status.validBathroom ? <Text style={styles.title}>{name} <Image source={verif} style={styles.verif}/> </Text> : <Text style={styles.title}>{name}</Text>}
                      <PaperButton
                        style={{
                          flex:1,
                          flexGrow: 1,
                          width: '100%',
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                          alignSelf: 'center',
                          backgroundColor: '#9A9AFE',
                        }}
                        labelStyle={styles.text}
                        mode="contained" 
                        onPress={() => navigation.navigate('RateBathroom', {
                          bathroomID: bathroomID,
                          name: name, 
                          ratings: ratings, 
                        })}
                      >
                        Review!   
                      </PaperButton>
                  </View>

                  <View style={styles.body}>
                    <Text style = {styles.distance}>{address} - {distance.toFixed(2)} km</Text>

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
                      <Text style={styles.statusText}>{hours}</Text>  
                    </View>
                    
                    <View style={styles.tagsContainer}>
                        {tags.map((tag) => (
                          <Tag key={tag} tag={tag} />
                        ))}
                    </View>
                  </View>
                </View> 
                {/* first component */}
                
                {status.validBathroom ?  null : <BathroomVerif bathroomID={bathroomID}/>}

                <View style={styles.component}>
                  <View style={styles.body}>
                    <View style={styles.section}>
                      {/* {status.validBathroom ?  <Text style={styles.sectionTitle}>Verified!</Text> : <BathroomVerif bathroomID={bathroomID}/>} */}
                      <Text style={styles.sectionTitle}>Overall</Text>
                      <Rating Rating = {ratings.overallRating}/>
                    </View>
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Cleanliness</Text>
                        <Rating Rating = {ratings.cleanRating}/>
                    </View>
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Boujeeness</Text>
                      <Rating Rating = {ratings.boujeeRating}/>
                    </View>
                  </View>
                </View>
              {/* second component */}

              <View style={styles.revSection}>
              {reviewSummary ?  <RevSummary reviewSummary = {reviewSummary}/> : <RevSummary reviewSummary = "Sorry! It appears there's no summary for this restroom yet :("/>}
              </View>

              <View style={styles.component}>
                {/* <View style={styles.section}> */}
                  <Text style={styles.locSectionTitle}>Location</Text>
                    <PaperButton
                      style={{
                          flex:1,
                          flexGrow: 1,
                          width: 'auto',
                          height: 'auto',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                          alignSelf: 'center',
                          backgroundColor: '#9A9AFE',
                      }}
                      labelStyle={styles.locText}
                      mode="contained" 
                      onPress={openMap}
                    >
                      Open in Maps
                    </PaperButton>
                    <View style={styles.map}>
                      <ShowMap longitude={coords.long} latitude={coords.lat} />
                    </View>
                {/* </View> */}
              </View>
              {/* third component */}

              <View style={styles.component}>
                  <View style={styles.section}>
                    <Text style={styles.revSectionTitle}>Reviews</Text>
                    {reviews.map((eachReview)=>(<Review review = {eachReview} key = {eachReview.reviewID}/> ))}
                  </View>
              </View>
                
            {/* </View> */}
          </ScrollView>
        {/* </View> */}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default BathroomScreen;

const styles = StyleSheet.create({
      megaConatiner: {
        flex: 1,
        justifyContent:'flex-start',
        height: '100%',
        width: '100%',
        backgroundColor: '#F0F3FB',
      },
      reviewBox: {
        // flexDirection: 'row',
        paddingVertical: 0,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 25,
        marginVertical: 0,
        marginHorizontal: 0,
        width: '100%',
        height: '100%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 99,
        justifyContent: 'center',
        alignItems: 'center',
      },
      containerView: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
      },
      component: {
        flex: 1,
        marginLeft: '4%',
        marginRight: '4%',
        marginBottom: '5%',
        width: '90%',
        height: 'auto',
        backgroundColor: '#fff',
        
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 99,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        width: '100%',
        fontSize: 18,
        // lineHeight: 21,
        color: "#000",
        textAlign: "center",
        fontFamily: "Comfortaa",
      },
      container: {
        padding: 0,
        flex: 1,
      },
      distance:{
        fontSize: 16,
        fontFamily: "Comfortaa",
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        //justifyContent: 'space-between',
        width: '100%',
        paddingRight: 10,
        paddingLeft: 20,
        paddingTop: 10,
      },
      buttonContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 2,
        backgroundColor: '#F5A623'
     },
     buttonText: {
        color: 'black',
        fontSize: 15,
        fontFamily: "Comfortaa",
      },
      body: {
        flex: 1,
        padding: 20,
      },
      footer: {
        padding: 20,
      },
      logoView: {
        width: 30,
        height: 30,
        // paddingBottom: 10,
        // marginTop: 0
        resizeMode: 'contain',
      }, 
      verif: {
        width: 30,
        height: 30,
        alignSelf: 'bottom',
        justifyContent: 'bottom',
        resizeMode: 'contain',
        // backgroundColor: '#7D77FF',
      },
      map:{
        width: '100%',
        height: 200,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: "Comfortaa",
        width: '60%',
        flexWrap: 'wrap',
        textAlign: 'left',
      },
      section: {
        width: '90%',
        marginBottom: 20,
        alignItems: 'center',
        // marginTop: 10,
        // marginBottom: 10,
      },
      revSection: {
        alignItems: 'center',
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: "Comfortaa",
        marginBottom: 10,
      },
      locSectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: "Comfortaa",
        marginBottom: '2%',
        marginTop: '4%',
      },
      revSectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: "Comfortaa",
        marginBottom: '4%',
        marginTop: '4%',
      },
      locText: {
        fontSize: 16,
        marginBottom: 10,
        fontFamily: "Comfortaa",
        color: "#000",
      },
      statusText:{
        padding: 10,
        fontSize: 16,
        fontFamily: "Comfortaa",
        alignSelf: 'center',

      },
      review: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
      },
      reviewText: {
        fontSize: 16,
        fontFamily: "Comfortaa",
      },
    ratings: {
        marginTop: 20,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
        marginTop: 20,
      },
    tag: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#7D77FF',
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10,
      },
    tagText: {
        fontSize: 16,
        fontFamily: "Comfortaa",
      },
    returnButton: {
      marginTop: 20,
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
      fontSize: 16,
      fontFamily: "Comfortaa",
    },
    opentag: {
      marginTop: 0,
      alignSelf: 'center',
      paddingVertical: 10,
      paddingHorizontal: 25,
      backgroundColor: '#66ffc2',
      borderRadius: 5,
      opacity: 1,
    },
    closedtag: {
      marginTop: 0,
      alignSelf: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#ff9999',
      borderRadius: 5,
      opacity: 1,
    },
    hoursection: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 10,
    },
});
