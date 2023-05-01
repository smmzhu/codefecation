import React, {useState, useEffect} from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { StyleSheet } from 'react-native';
import Rater from '../components/Rater.jsx';
import Rating from '../components/Rating.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import Review from '../components/Review.jsx';
import ShowMap from '../components/ShowMap.jsx';
import Tag from '../components/Tag.jsx';
import BathroomVerif from '../components/BathroomVerif.jsx';

const BathroomScreen = ({ route, navigation }) => {
    const {bathroomID, coords, name, tags, ratings, reviews, status, hours, userLoc} = route.params; //assume that bathroom ratings is a json
    const [open, changeopen] = useState(true);
    const initialCoords = userLoc.latitude + "," + userLoc.longitude;
    const finalCoords = coords.lat + "," + coords.long;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${initialCoords}&destination=${finalCoords}`;
    function openMap() {
      Linking.openURL(url);
    }
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
    }, []);

    return (
    <SafeAreaView>
    <ScrollView>
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>{name}</Text>
            <Text style = {styles.body}>Distance: {distance.toFixed(2)} km</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('RateBathroom', {
                      bathroomID: bathroomID,
                      name: name, 
                      ratings: ratings, 
                    })}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>{"Leave a Review!"}</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.sectionTitle}>Hours</Text>
            <View style={styles.hoursection}>
              <Text style={styles.text}>{hours}</Text>
                {open && (
                  <View style={styles.opentag}>
                    <Text>open</Text>
                  </View>
                )}
                {!open && (
                  <View style={styles.closedtag}>
                    <Text>closed</Text>
                  </View>
                )}
            </View>
            <View style={styles.section}>
                {status.validBathroom ?  <Text>Verified!</Text> : <BathroomVerif bathroomID={bathroomID}/>}
                <Text style={styles.sectionTitle}>Overall Rating</Text>
                <Rating Rating = {ratings.overallRating}/>
            </View>
            <View style={styles.tagsContainer}>
                <Text style={styles.sectionTitle}>Tags:</Text>
                {tags.map((tag) => (
                  <Tag key={tag} tag={tag} />
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cleanliness Rating</Text>
                {/* REPLACE WITH REAL CLEANLINESS RATING */}
                <Rating Rating = {ratings.cleanRating}/>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Boujeeness Rating</Text>
                {/* REPLACE WITH REAL BOUJEE RATING */}
                <Rating Rating = {ratings.boujeeRating}/>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Reviews</Text>
                <Text style={styles.text}>
                  <View style = {{padding: 10}}>
                    {reviews.map((eachReview)=>(<Review review = {eachReview} key = {eachReview.reviewID}/> ))}
                  </View>
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Map</Text>
                <TouchableOpacity
                  style={styles.returnButton}
                  onPress={openMap}
                >
                  <Text style={styles.mapButtonText}>Open in Maps</Text>
                </TouchableOpacity>
                <View style={styles.map}>
                  <ShowMap longitude={coords.long} latitude={coords.lat} />
                </View>
            </View>
        </View>
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.returnButtonText}>Return</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      </SafeAreaView>
    // <View style={styles.container}>
    //   <Text style={styles.text}>{name}</Text>
    //     <View style={styles.rater}>
    //         <Rater Rating = {ratings}/>
    //     </View>
    //     <View style={{marginTop: 10}}>
    //         <Button title="Go back" onPress={() => navigation.goBack()} />
    //     </View>
    // </View>
  );
};

export default BathroomScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
        paddingVertical: 60,
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
      },
      body: {
        flex: 1,
        padding: 20,
      },
      footer: {
        padding: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        width: '60%',
        flexWrap: 'wrap',
        textAlign: 'left',
      },
      section: {
        marginBottom: 20,
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      text: {
        fontSize: 16,
        marginBottom: 10,
      },
      review: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
      },
      reviewText: {
        fontSize: 16,
      },
    ratings: {
        marginTop: 20,
    },
    tagsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
      },
    tag: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ddd',
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10,
      },
    tagText: {
        fontSize: 16,
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
    },
    opentag: {
      marginTop: 0,
      alignSelf: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: 'green',
      borderRadius: 5,
      opacity: 1,
    },
    closedtag: {
      marginTop: 0,
      alignSelf: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: 'red',
      borderRadius: 5,
      opacity: 1,
    },
    hoursection: {
      flex: 1,
      flexDirection: 'row',
      padding: 20,
      
    },
    text: {
      padding: 20,
      fontSize: 16,
    },
});
